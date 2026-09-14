<script setup>
import { ref, onMounted, watch } from 'vue'
import BaseModal from './BaseModal.vue'
import AddProductModal from './AddProductModal.vue'
import EditProductModal from './EditProductModal.vue'
import ImportPreviewModal from './ImportPreviewModal.vue'
import { getProducts, deleteProduct as deleteProductApi, updateProductStatus, createProductBulk } from '@/services/products'
import { downloadProductTemplate, downloadAllProducts, parseProductExcelFile } from '@/utils/productExcel'

const emit = defineEmits(['close', 'changed'])

const products = ref([])
const text = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const itemEdit = ref({})
const error = ref('')
const fileInput = ref(null)
const importing = ref(false)
const showImportPreview = ref(false)
const importPreviewRows = ref([])

async function fetchAllProducts() {
    error.value = ''
    try {
        products.value = await getProducts({ search: text.value })
    } catch (err) {
        console.error('Failed to fetch products', err)
        error.value = 'โหลดรายการสินค้าไม่สำเร็จ'
    }
}

onMounted(fetchAllProducts)

let searchTimeout
watch(text, () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(fetchAllProducts, 300)
})

const openAddModal = () => {
    showAddModal.value = true
}

const exportAllProducts = async () => {
    error.value = ''
    try {
        await downloadAllProducts()
    } catch (err) {
        console.error('Failed to export products', err)
        error.value = 'ดาวน์โหลดรายการสินค้าไม่สำเร็จ'
    }
}

const triggerImport = () => {
    fileInput.value?.click()
}

const onFileSelected = async (event) => {
    const file = event.target.files[0]
    event.target.value = ''
    if (!file) {
        return
    }

    error.value = ''
    importing.value = true
    try {
        const { products: parsedProducts, errors } = await parseProductExcelFile(file)
        if (errors.length > 0) {
            error.value = `ไฟล์มีข้อมูลไม่ถูกต้อง:\n${errors.join('\n')}`
            return
        }
        if (parsedProducts.length === 0) {
            error.value = 'ไม่พบข้อมูลสินค้าในไฟล์'
            return
        }

        const existingProducts = await getProducts()
        const existingNames = new Set(existingProducts.map((product) => product.name.trim().toLowerCase()))
        const seenNames = new Set()
        importPreviewRows.value = parsedProducts.map((product) => {
            const key = product.name.trim().toLowerCase()
            const isDuplicate = existingNames.has(key) || seenNames.has(key)
            seenNames.add(key)
            return { ...product, isDuplicate }
        })
        showImportPreview.value = true
    } catch (err) {
        console.error('Failed to prepare import preview', err)
        error.value = 'นำเข้าสินค้าไม่สำเร็จ'
    } finally {
        importing.value = false
    }
}

const confirmImport = async (rowsToImport) => {
    error.value = ''
    try {
        await createProductBulk(rowsToImport)
        showImportPreview.value = false
        fetchAllProducts()
        emit('changed')
    } catch (err) {
        console.error('Failed to import products', err)
        error.value = 'นำเข้าสินค้าไม่สำเร็จ'
    }
}

const openEdit = (product) => {
    itemEdit.value = product
    showEditModal.value = true
}

const onAdded = () => {
    showAddModal.value = false
    fetchAllProducts()
    emit('changed')
}

const onEdited = () => {
    showEditModal.value = false
    fetchAllProducts()
    emit('changed')
}

const deleteProduct = async (product) => {
    if (!confirm(`ลบ "${product.name}" ใช่หรือไม่?`)) {
        return
    }
    error.value = ''
    try {
        await deleteProductApi(product.id)
        fetchAllProducts()
        emit('changed')
    } catch (err) {
        console.error('Failed to delete product', err)
        error.value = 'ลบสินค้าไม่สำเร็จ'
    }
}

const changeProductStatus = async (product) => {
    error.value = ''
    try {
        await updateProductStatus(product.id, {isActive :!product.isActive})
        fetchAllProducts()
        emit('changed')
    } catch (err) {
        console.error('Failed to update product status', err)
        error.value = 'เปลี่ยนสถานะสินค้าไม่สำเร็จ'
    }
}

</script>

<template>
    <BaseModal width="w-[80%]">
        <div class="flex items-center justify-between border-b border-neutral-800 pb-3 mb-3 gap-3">
            <p class="text-xl font-semibold shrink-0">Product Lists</p>
            <div class="flex gap-10">
                <button @click="downloadProductTemplate"
                class="px-3 py-1.5 border border-neutral-700 hover:bg-neutral-800 cursor-pointer rounded-lg text-sm font-medium shrink-0">
                Download Template</button>
                <button @click="exportAllProducts"
                class="px-3 py-1.5 border border-neutral-700 hover:bg-neutral-800 cursor-pointer rounded-lg text-sm font-medium shrink-0">
                Download Products</button>
                <input ref="fileInput" type="file" accept=".xlsx,.xls" class="hidden" @change="onFileSelected">
                <button @click="triggerImport" :disabled="importing"
                class="px-3 py-1.5 border border-neutral-700 hover:bg-neutral-800 cursor-pointer rounded-lg text-sm font-medium shrink-0 disabled:opacity-50 disabled:cursor-not-allowed">
                {{ importing ? 'กำลังนำเข้า...' : 'Import Excel' }}</button>
                <input v-model="text" class="border border-neutral-700 bg-neutral-900 rounded-xl p-1 pl-2 w-60"
                    type="text" placeholder="Search...">
                <button @click="openAddModal"
                    class="px-3 py-1.5 bg-amber-500 text-black hover:bg-amber-600 cursor-pointer rounded-lg text-sm font-medium shrink-0">
                    Add +</button>
            </div>
        </div>
        <p v-if="error" class="text-sm text-red-500 mb-2 whitespace-pre-line">{{ error }}</p>
        <p v-if="products.length === 0" class="text-sm mb-2 text-center">ยังไม่มีรายการ</p>
        <div class="grid grid-cols-3 gap-2 max-h-[50vh] overflow-y-auto pr-1">
            <div v-for="product in products" :key="product.id"
                class="border border-neutral-800 bg-neutral-900/60 p-3 rounded-xl flex items-center justify-between gap-3">
                <div class="flex flex-col gap-1">
                    <p class="font-medium">{{ product.name }}</p>
                    <div class="flex items-center gap-2 text-sm text-neutral-400">
                        <span class="text-amber-500 font-semibold">{{ product.price }} ฿</span>
                        <span>{{ product.type }}</span>
                    </div>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    <button @click="changeProductStatus(product)"
                        :class="product.isActive ? 'bg-green-600' : 'bg-neutral-700 text-neutral-300'"
                        class="px-3 py-1 rounded-full text-xs font-semibold cursor-pointer">{{ product.isActive ? 'แสดง' : 'ไม่แสดง' }}</button>
                    <button @click="openEdit(product)"
                        class="px-3 py-1 text-sm bg-neutral-700 hover:bg-neutral-600 rounded-lg cursor-pointer">
                        Edit</button>
                    <button @click="deleteProduct(product)"
                        class="px-3 py-1 text-sm bg-red-600 hover:bg-red-800 rounded-lg cursor-pointer">Delete</button>
                </div>
            </div>
        </div>

        <template #footer>
            <button @click="$emit('close')"
                class="px-4 py-2 border border-neutral-700 rounded hover:bg-neutral-800">Close</button>
        </template>
    </BaseModal>
    <AddProductModal v-if="showAddModal" @close="showAddModal = false" @save="onAdded" />
    <EditProductModal v-if="showEditModal" :item="itemEdit" @close="showEditModal = false" @save="onEdited" />
    <ImportPreviewModal v-if="showImportPreview" :rows="importPreviewRows" @close="showImportPreview = false"
        @confirm="confirmImport" />
</template>
