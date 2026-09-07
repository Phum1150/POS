<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import BaseModal from './BaseModal.vue'

const cart = useCartStore()
const CartName = ref('')

const emit = defineEmits(['close', 'save'])

const save = (name) => {
    const existing = Object.values(cart.savedCarts).find(c => c.name === name)
    if (existing && !window.confirm(`Cart "${name}" already exists. Overwrite?`)) {
        return
    }
    if (cart.saveCurrentCart(name, existing)) {
        cart.clearCart()
        emit('save')
    }
}

</script>

<template>
    <BaseModal width="w-[20%]">
        <p class="text-xl font-semibold">Save Cart</p>

        <input v-model="CartName" min="1" class="w-full p-2 border rounded mb-2" placeholder="NewCart" />

        <template #footer>
            <button @click="$emit('close')" class="px-4 py-2 border rounded hover:bg-gray-900">Cancel</button>
            <button @click="save(CartName)" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save</button>
        </template>
    </BaseModal>
</template>