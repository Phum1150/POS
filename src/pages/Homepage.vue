<script setup>
import Products from '@/components/Products.vue';
import Cart from '@/components/Cart.vue';
</script>

<template>
    <div class="h-screen p-4 flex flex-col space-y-10">
        <p class="text-4xl font-bold">Coffee ee</p>
        <div class="grid grid-cols-5 gap-2 items-start flex-1 min-h-0">
            <Products />
            <Cart />
        </div>
    </div>
</template>