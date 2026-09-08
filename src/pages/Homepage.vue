<script setup>
import Products from '@/components/Products.vue';
import Cart from '@/components/Cart.vue';
</script>

<template>
    <div class="h-screen flex flex-col space-y-5">
        <div class="p-3 flex items-center gap-3 border-b border-neutral-800">
            <div class="w-2 h-8 bg-amber-500 rounded-full"></div>
            <p class="text-4xl font-bold tracking-tight">Coffee ee</p>
        </div>
        <div class="grid grid-cols-6 gap-2 items-start flex-1 min-h-0 p-2">
            <Products />
            <Cart />
        </div>
    </div>
</template>