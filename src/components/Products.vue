<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const text = ref('')
const drinks = [
    { id: 1, name: 'Espresso', price: 45 },
    { id: 2, name: 'Latte', price: 55 },
    { id: 3, name: 'Cappuccino', price: 55 },
    { id: 4, name: 'Americano', price: 40 },
    { id: 5, name: 'Mocha', price: 60 },
    { id: 6, name: 'Green Tea', price: 50 },
    { id: 7, name: 'Croissant', price: 65 },
    { id: 8, name: 'Muffin', price: 45 },
    { id: 9, name: 'Sandwich', price: 75 },
    { id: 10, name: 'Cheesecake', price: 85 },
    { id: 11, name: 'Macchiato', price: 55 },
    { id: 12, name: 'Flat White', price: 60 },
    { id: 13, name: 'Cold Brew', price: 65 },
    { id: 14, name: 'Iced Latte', price: 60 },
    { id: 15, name: 'Iced Americano', price: 45 },
    { id: 16, name: 'Caramel Macchiato', price: 65 },
    { id: 17, name: 'Hazelnut Latte', price: 65 },
    { id: 18, name: 'Vanilla Latte', price: 65 },
    { id: 19, name: 'Affogato', price: 70 },
    { id: 20, name: 'Hot Chocolate', price: 55 },
    { id: 21, name: 'Matcha Latte', price: 65 },
    { id: 22, name: 'Black Tea', price: 40 },
    { id: 23, name: 'Earl Grey', price: 45 },
    { id: 24, name: 'Thai Milk Tea', price: 45 },
    { id: 25, name: 'Lemon Tea', price: 40 },
    { id: 26, name: 'Chocolate Milk', price: 45 },
    { id: 27, name: 'Orange Juice', price: 50 },
    { id: 28, name: 'Lemonade', price: 45 },
    { id: 29, name: 'Smoothie Mango', price: 65 },
    { id: 30, name: 'Smoothie Strawberry', price: 65 },
]

const sweets = [
    { id: 51, name: 'Chocolate Cake', price: 85 },
    { id: 52, name: 'Carrot Cake', price: 80 },
    { id: 53, name: 'Tiramisu', price: 90 },
    { id: 54, name: 'Macaron', price: 50 },
    { id: 55, name: 'Croissant', price: 65 },
    { id: 56, name: 'Muffin', price: 45 },
    { id: 57, name: 'Cheesecake', price: 85 },
    { id: 58, name: 'Brownie', price: 55 },
    { id: 59, name: 'Cookie', price: 35 },
    { id: 60, name: 'Donut', price: 40 },
    { id: 61, name: 'Waffle', price: 70 },
    { id: 62, name: 'Pancake', price: 70 },
    { id: 63, name: 'Danish Pastry', price: 60 },
    { id: 64, name: 'Bagel', price: 55 },
    { id: 65, name: 'Yogurt Parfait', price: 55 },
    { id: 66, name: 'Fruit Salad', price: 60 },
    { id: 67, name: 'Cinnamon Roll', price: 60 },
    { id: 68, name: 'Apple Pie', price: 75 },
    { id: 69, name: 'Ice Cream', price: 50 },
    { id: 70, name: 'Pudding', price: 45 },
]

const category = ref(drinks)
const products = computed(() => category.value.filter((product) => product.name.toLowerCase().includes(text.value.toLowerCase())))

</script>

<template>
    <div class="col-span-3 h-full flex flex-col min-h-0">
        <div class="flex justify-between h-10">
            <div class="flex shrink-0">
                <button @click="category = drinks"
                    class="border-2 font-semibold rounded-t-2xl border-b-0 px-6 pb-1 cursor-pointer">Drinks</button>
                <button @click="category = sweets"
                    class="border-2 font-semibold rounded-t-2xl border-b-0 px-6 pb-1 cursor-pointer">Sweets</button>
            </div>
            <div class="">
                <input v-model="text" class="border rounded-xl w-75 p-1 mb-1" type="text" placeholder="Search...">
            </div>

        </div>
        <div class="border-2 rounded-b-2xl rounded-tr-2xl flex-1 min-h-0 overflow-y-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5 p-2">
                <button @click="cart.addItem({ id: product.id, name: product.name, price: product.price })"
                    v-for="product in products" :key="product.id"
                    class="w-40 h-30 p-4 bg-gray-800 hover:bg-gray-900 text-left rounded-2xl space-y-5 cursor-pointer">
                    <p>{{ product.name }}</p>
                    <p>Price: {{ product.price }}</p>
                </button>
            </div>
        </div>
    </div>
</template>