<script setup>
import { ref } from 'vue'
import BaseModal from './BaseModal.vue'
import { createProduct } from '@/services/products'

const emit = defineEmits(['close', 'save'])

const name = ref('')
const price = ref(0)
const type = ref('DRINK')
const error = ref('')

const save = async () => {
    error.value = ''
    try {
        await createProduct({ name: name.value, price: price.value, type: type.value })
        emit('save')
    } catch (err) {
        console.error('Failed to create product', err)
        error.value = 'บันทึกสินค้าไม่สำเร็จ กรุณาลองใหม่'
    }
}

</script>

<template>
    <BaseModal width="w-[30%]">
        <p class="text-xl font-semibold border-b border-neutral-800 pb-3 mb-4">Add Product</p>
        <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-1">
                <label for="ProdName" class="text-sm text-neutral-400">Product Name</label>
                <input id="ProdName" v-model="name" type="text"
                    class="w-full p-2 border border-neutral-700 bg-neutral-900 rounded-lg focus:border-amber-500 outline-none" />
            </div>
            <div class="grid grid-cols-2 gap-3">
                <div class="flex flex-col gap-1">
                    <label for="ProdPrice" class="text-sm text-neutral-400">Price</label>
                    <input id="ProdPrice" v-model.number="price" type="number" min="0"
                        class="w-full p-2 border border-neutral-700 bg-neutral-900 rounded-lg focus:border-amber-500 outline-none" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="ProdType" class="text-sm text-neutral-400">Type</label>
                    <select id="ProdType" v-model="type"
                        class="w-full p-2 border border-neutral-700 bg-neutral-900 rounded-lg focus:border-amber-500 outline-none">
                        <option class="bg-neutral-900" value="DRINK">Drink</option>
                        <option class="bg-neutral-900" value="SWEET">Sweet</option>
                    </select>
                </div>
            </div>
            <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
        </div>

        <template #footer>
            <button @click="$emit('close')" class="px-4 py-2 border border-neutral-700 rounded hover:bg-neutral-800">Close</button>
            <button @click="save" class="bg-amber-500 text-black px-4 py-2 rounded hover:bg-amber-600">Save</button>
        </template>
    </BaseModal>
</template>
