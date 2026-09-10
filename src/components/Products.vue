<script setup>
import { ref, onMounted, watch } from 'vue'
import { useCartStore } from '@/stores/cart'
import { getProducts } from '@/services/products'
import ProductSettingModal from './Modal/ProductSettingModal.vue'

const cart = useCartStore()
const text = ref('')
const products = ref([])
const category = ref('DRINK')
const showSettingModal = ref(false)

async function fetchProducts() {
    try {
        products.value = await getProducts({ type: category.value, search: text.value, isActive: true })
    } catch (error) {
        console.error('Failed to fetch products', error)
    }
}

onMounted(fetchProducts)
watch(category, fetchProducts)

let searchTimeout
watch(text, () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(fetchProducts, 300)
})

const openSetting = () => {
    showSettingModal.value = true
}

</script>

<template>
    <div class="col-span-4 h-full flex flex-col min-h-0 gap-3">
        <div class="flex justify-between flex-col">
            <div class="h-10 w-full flex items-center justify-between mb-1">
                <p class="text-2xl font-semibold">Category</p>
                <button @click="openSetting"
                    class="border border-neutral-700 px-3 py-1 rounded-xl hover:bg-neutral-800 cursor-pointer font-semibold text-sm">
                    Setting</button>
            </div>
            <div class="flex justify-between gap-2">
                <div class="flex gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-full w-fit">
                    <button @click="category = 'DRINK'"
                        :class="category === 'DRINK' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'"
                        class="px-5 py-2 rounded-full font-medium cursor-pointer transition-colors">Drinks</button>
                    <button @click="category = 'SWEET'"
                        :class="category === 'SWEET' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'"
                        class="px-5 py-2 rounded-full font-medium cursor-pointer transition-colors">Sweets</button>
                </div>
                <input v-model="text" class="border border-neutral-700 bg-neutral-900 rounded-xl w-75 p-1 pl-2 mb-1"
                    type="text" placeholder="Search...">
            </div>

        </div>
        <p class="text-2xl">Menu</p>
        <div class="flex-1 min-h-0 overflow-y-auto p-1">
            <p v-if="products.length === 0" class="text-sm mb-2 text-center">ยังไม่มีรายการ</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                <button @click="cart.addItem({ id: product.id, name: product.name, price: product.price })"
                    v-for="product in products" :key="product.id"
                    class="min-h-28 p-4 bg-neutral-900 border border-neutral-800 hover:border-amber-500/60 hover:bg-neutral-800 text-left rounded-xl flex flex-col justify-between gap-3 cursor-pointer transition-colors">
                    <p class="font-medium leading-snug">{{ product.name }}</p>
                    <p class="text-amber-500 font-semibold">{{ product.price }} ฿</p>
                </button>
            </div>
        </div>
    </div>
    <ProductSettingModal v-if="showSettingModal" @close="showSettingModal = false" @changed="fetchProducts" />
</template>