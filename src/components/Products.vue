<script setup>
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const products = [
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
]
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5 col-span-3">
        <button @click="cart.addItem({id: product.id ,name: product.name, price: product.price})" v-for="product in products" :key="product.id"
            class="w-full p-4 bg-gray-800 hover:bg-gray-900 text-left rounded-2xl space-y-5 cursor-pointer">
            <p>{{ product.name }}</p>
            <p>Price: {{ product.price }}</p>
        </button>
    </div>

</template>