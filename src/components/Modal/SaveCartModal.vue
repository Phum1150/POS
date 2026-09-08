<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import BaseModal from './BaseModal.vue'

const cart = useCartStore()
const CartName = ref('')

const emit = defineEmits(['close', 'save'])

const save = (name) => {
    name = name.trim() || 'NewCart'
    const existing = Object.values(cart.savedCarts).find(c => c.name === name)
    const isExist = existing && !confirm(`Cart "${name}" already exists. Overwrite?`)
    
    if (isExist) {
        return
    }
    
    const canSaveCart = cart.saveCurrentCart(name, existing)
    if (canSaveCart) {
        cart.clearCart()
        emit('save')
    }
}

</script>

<template>
    <BaseModal width="w-[20%]">
        <p class="text-xl font-semibold mb-2">Save Cart</p>

        <input v-model="CartName" min="1" class="w-full p-2 border border-neutral-700 bg-neutral-900 rounded mb-2" placeholder="NewCart" />

        <template #footer>
            <button @click="$emit('close')" class="px-4 py-2 border border-neutral-700 rounded hover:bg-neutral-800">Cancel</button>
            <button @click="save(CartName)" class="bg-amber-500 text-black px-4 py-2 rounded hover:bg-amber-600">Save</button>
        </template>
    </BaseModal>
</template>