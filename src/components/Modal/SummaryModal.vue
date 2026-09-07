<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import BaseModal from './BaseModal.vue'
const cart = useCartStore()

const props = defineProps({
    show: Boolean,
    items: Object,
})

const emit = defineEmits(['close', 'checkout'])

const checkout = () => {
    cart.checkout()
    emit('checkout')
}
</script>

<template>
    <BaseModal width="w-[20%]">
        <p class="text-xl font-semibold">Summary</p>
        <p>Total Items : {{cart.itemCount}}</p>
        <p>Total Price : {{ cart.total }}</p>

        <template #footer>
            <button @click="$emit('close')" class="px-4 py-2 border rounded hover:bg-gray-900">Cancel</button>
            <button @click="checkout" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Checkout</button>
        </template>
    </BaseModal>
</template>