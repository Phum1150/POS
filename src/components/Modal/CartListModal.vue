<script setup>
import { ref, onMounted } from 'vue'
import { getCarts, deleteCarts, getCartsById } from '@/services/carts'
import BaseModal from './BaseModal.vue'

const emit = defineEmits(['close', 'load'])

const carts = ref([])
const error = ref('')

async function fetchCarts() {
    try {
        carts.value = await getCarts()
    } catch (error) {
        console.error('Failed to fetch carts', error)
    }
}

onMounted(fetchCarts)

const del = async (cart) => {
    if (!confirm(`ลบ "${cart.name}" ใช่หรือไม่?`)) {
        return
    }
    error.value = ''
    try {
        await deleteCarts(cart.id)
        fetchCarts()
    } catch (err) {
        console.error('Failed to delete cart', err)
        error.value = 'ลบตะกร้าไม่สำเร็จ'
    }
}
const load = async (id) => {
    error.value = ''
    try {
        const data = await getCartsById(id)
        emit('load', data)
        emit('close')
    } catch (err) {
        console.error('Failed to delete cart', err)
        error.value = 'ลบตะกร้าไม่สำเร็จ'
    }
}


</script>

<template>
    <BaseModal width="w-[30%]" @close="emit('close')">
        <p class="text-xl font-semibold border-b border-neutral-800 pb-3 mb-3">Cart List</p>
        <div class="flex flex-col gap-2 max-h-[50vh] overflow-y-auto pr-1">
            <p v-if="carts.length === 0" class="text-center text-neutral-500 py-8">ยังไม่มีตะกร้าที่บันทึกไว้</p>
            <div v-for="(cart, index) in carts" :key="cart.id"
                class="border border-neutral-800 bg-neutral-900/60 p-3 rounded-xl flex items-center justify-between gap-3">
                <p class="font-medium">{{ index + 1 }}. {{ cart.name }}</p>
                <div class="flex gap-2 shrink-0">
                    <button @click="load(cart.id)" class="px-3 py-1 text-sm bg-neutral-700 rounded-lg cursor-pointer">
                        Load</button>
                    <button @click="del(cart)"
                        class="px-3 py-1 text-sm bg-red-600 rounded-lg cursor-pointer">Remove</button>
                </div>
            </div>
        </div>
    </BaseModal>
</template>