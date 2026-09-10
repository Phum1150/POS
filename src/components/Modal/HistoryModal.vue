<script setup>
import { ref, onMounted } from 'vue'
import { getCheckoutHistory } from '@/services/checkout'
import BaseModal from './BaseModal.vue'

const emit = defineEmits(['close'])

const history = ref([])
const error = ref('')
const expandedIds = ref(new Set())

function orderSubtotal(order) {
    return order.items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
}

function orderItemCount(order) {
    return order.items.reduce((sum, item) => sum + item.quantity, 0)
}

async function fetchHistory() {
    error.value = ''
    try {
        history.value = await getCheckoutHistory()
    } catch (err) {
        console.error('Failed to fetch checkout history', err)
        error.value = 'โหลดประวัติการสั่งซื้อไม่สำเร็จ'
    }
}

function formatDate(iso) {
    return new Date(iso).toLocaleString('th-TH', {
        dateStyle: 'medium',
        timeStyle: 'short',
    })
}

function toggleExpand(id) {
    const next = new Set(expandedIds.value)
    if (next.has(id)) {
        next.delete(id)
    } else {
        next.add(id)
    }
    expandedIds.value = next
}

onMounted(fetchHistory)
</script>

<template>
    <BaseModal width="w-[35%]">
        <p class="text-xl font-semibold border-b border-neutral-800 pb-3 mb-3">Order History</p>

        <p v-if="error" class="text-center text-red-500 py-8">{{ error }}</p>
        <p v-else-if="history.length === 0" class="text-center text-neutral-500 py-8">ยังไม่มีประวัติการสั่งซื้อ</p>

        <template v-else>
            <div class="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-1">
                <div v-for="order in history" :key="order.id"
                    class="border border-neutral-800 bg-neutral-900/60 rounded-xl overflow-hidden">
                    <button @click="toggleExpand(order.id)"
                        class="w-full p-3 flex items-center justify-between gap-3 cursor-pointer hover:bg-neutral-800/60 text-left">
                        <div class="flex items-center gap-2">
                            <span class="text-neutral-500 text-xs transition-transform"
                                :class="{ 'rotate-90': expandedIds.has(order.id) }">></span>
                            <div class="flex flex-col">
                                <p class="font-medium">Order #{{ order.id }}</p>
                                <p class="text-xs text-neutral-500">{{ formatDate(order.createdAt) }}</p>
                            </div>
                        </div>
                        <div class="flex flex-col items-end">
                            <p v-if="order.promotion" class="text-xs text-amber-500">{{ order.promotion }}</p>
                            <p v-if="!expandedIds.has(order.id)" class="text-lg font-bold text-amber-500">{{ order.netPrice }} ฿</p>
                        </div>
                    </button>
                    <div v-if="expandedIds.has(order.id)" class="border-t border-neutral-800 p-3 pt-2 flex flex-col gap-2">
                        <div class="flex flex-col gap-1">
                            <div v-for="item in order.items" :key="item.id" class="flex justify-between text-sm text-neutral-300">
                                <span>{{ item.productName || `Product #${item.productId}` }} x{{ item.quantity }}</span>
                                <span>{{ item.price * item.quantity }} ฿</span>
                            </div>
                        </div>
                        <div class="flex flex-col gap-1 text-sm border-t border-neutral-800 pt-2">
                            <p class="flex justify-between text-neutral-400">
                                <span>Total Items</span><span class="text-white">{{ orderItemCount(order) }}</span>
                            </p>
                            <p class="flex justify-between text-neutral-400">
                                <span>Base Price</span><span class="text-white">{{ orderSubtotal(order) }} ฿</span>
                            </p>
                            <p v-if="orderSubtotal(order) - order.netPrice > 0" class="flex justify-between text-green-500">
                                <span>Discount</span><span>-{{ orderSubtotal(order) - order.netPrice }} ฿</span>
                            </p>
                            <p class="flex justify-between items-baseline pt-1">
                                <span class="text-neutral-400">Total Price</span>
                                <span class="text-xl font-bold text-amber-500">{{ order.netPrice }} ฿</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template #footer>
            <button @click="$emit('close')" class="px-4 py-2 border border-neutral-700 rounded hover:bg-neutral-800">Close</button>
        </template>
    </BaseModal>
</template>
