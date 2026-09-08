<script setup>
import Products from '@/components/Products.vue';
import Cart from '@/components/Cart.vue';
</script>

<template>
    <div class="h-screen flex flex-col space-y-5">
        <div class="p-3">
            <p class="text-4xl font-bold">Coffee ee</p>
        </div>
        <div class="grid grid-cols-6 gap-2 items-start flex-1 min-h-0 p-2">
            <Products />
            <Cart />
        </div>
    </div>
</template>