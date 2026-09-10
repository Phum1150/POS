<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { getCarts, createCarts, updateCarts } from '@/services/carts'
import BaseModal from './BaseModal.vue'

const cart = useCartStore()
const cartName = ref('')
const error = ref('')

const emit = defineEmits(['close', 'save'])

const save = async (name) => {
    error.value = ''
    const trimmedName = name.trim() || 'NewCart'
    const items = cart.items.map(item => ({ id: item.id, quantity: item.qty }))

    try {
        const existingCarts = await getCarts()
        const existing = existingCarts.find(c => c.name === trimmedName)

        if (existing && !confirm(`Cart "${trimmedName}" already exists. Overwrite?`)) {
            return
        }

        if (existing) {
            await updateCarts(existing.id, { name: trimmedName, items })
        } else {
            await createCarts({ name: trimmedName, items })
        }

        cart.clearCart()
        emit('save')
    } catch (err) {
        console.error('Failed to save cart', err)
        error.value = 'บันทึกตะกร้าไม่สำเร็จ กรุณาลองใหม่'
    }
}

</script>

<template>
    <BaseModal width="w-[20%]">
        <p class="text-xl font-semibold mb-2">Save Cart</p>

        <input v-model="cartName" min="1" class="w-full p-2 border border-neutral-700 bg-neutral-900 rounded mb-2" placeholder="NewCart" />
        <p v-if="error" class="text-sm text-red-500 mb-2">{{ error }}</p>

        <template #footer>
            <button @click="$emit('close')" class="px-4 py-2 border border-neutral-700 rounded hover:bg-neutral-800">Cancel</button>
            <button @click="save(cartName)" class="bg-amber-500 text-black px-4 py-2 rounded hover:bg-amber-600">Save</button>
        </template>
    </BaseModal>
</template>