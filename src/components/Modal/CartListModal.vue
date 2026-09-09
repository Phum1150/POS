<script setup>
import { useCartStore } from '@/stores/cart'
import BaseModal from './BaseModal.vue'

const cart = useCartStore()

const emit = defineEmits(['close', 'checkout'])

const load = (id) => {
    cart.loadSavedCart(id)
    emit('close')
}

const del = (id) => {
    cart.deleteSavedCart(id)
}

</script>

<template>
    <BaseModal width="w-[30%]" @close="emit('close')">
        <p class="text-xl font-semibold border-b border-neutral-800 pb-3 mb-3">Cart List</p>
        <div class="flex flex-col gap-2 max-h-[50vh] overflow-y-auto pr-1">
            <p v-if="cart.savedCartList.length === 0" class="text-center text-neutral-500 py-8">ยังไม่มีตะกร้าที่บันทึกไว้</p>
            <div v-for="(item, index) in cart.savedCartList" :key="item.id"
                class="border border-neutral-800 bg-neutral-900/60 p-3 rounded-xl flex items-center justify-between gap-3">
                <p class="font-medium">{{ index + 1 }}. {{ item.name }}</p>
                <div class="flex gap-2 shrink-0">
                    <button @click="load(item.id)"
                        class="px-3 py-1 text-sm bg-neutral-700 hover:bg-neutral-600 rounded-lg cursor-pointer">
                        Load</button>
                    <button @click="del(item.id)"
                        class="px-3 py-1 text-sm bg-red-600 hover:bg-red-800 rounded-lg cursor-pointer">Remove</button>
                </div>
            </div>
        </div>
    </BaseModal>
</template>