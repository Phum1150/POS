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