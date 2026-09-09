<script setup>
import { ref } from 'vue'
import BaseModal from './BaseModal.vue'
import { usePromotionStore } from '@/stores/promotion.js'
import AddPromoModal from './AddPromoModal.vue'
import EditPromoModal from './EditPromoModal.vue'

const promo = usePromotionStore()
const showAddPromoModal = ref(false)
const showEditItemModal = ref(false)
const itemEdit = ref({})

const emit = defineEmits(['close'])

const openAddModal = () => {
    showAddPromoModal.value = true
}

const openEdit = (promotion) => {
    itemEdit.value = promotion
    showEditItemModal.value = true
}

</script>

<template>
    <BaseModal width="w-[50%]">
        <div class="flex items-center justify-between border-b border-neutral-800 pb-3 mb-3">
            <p class="text-xl font-semibold">Promotion Lists</p>
            <button @click="openAddModal"
                class="px-3 py-1.5 bg-amber-500 text-black hover:bg-amber-600 cursor-pointer rounded-lg text-sm font-medium">
                Add +</button>
        </div>
        <div class="flex flex-col gap-2 max-h-[50vh] overflow-y-auto pr-1">
            <div v-for="promotion in promo.promotions" :key="promotion.id"
                class="border border-neutral-800 bg-neutral-900/60 p-3 rounded-xl flex items-center justify-between gap-3">
                <div class="flex flex-col gap-1">
                    <p class="font-medium">{{ promotion.name }}</p>
                    <div class="flex items-center gap-2 text-sm text-neutral-400">
                        <span class="text-amber-500 font-semibold">{{ promotion.amount }}{{ promotion.type === 'percent' ? '%' : ' บาท' }}</span>
                        <span>ขั้นต่ำ {{ promotion.minPrice }} บาท</span>
                    </div>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    <button @click="promo.togglePromotion(promotion.id)"
                        :class="promotion.isUse ? 'bg-green-600' : 'bg-neutral-700 text-neutral-300'"
                        class="px-3 py-1 rounded-full text-xs font-semibold cursor-pointer">{{ promotion.isUse ? 'ON' : 'OFF'
                        }}</button>
                    <button @click="openEdit(promotion)"
                        class="px-3 py-1 text-sm bg-neutral-700 hover:bg-neutral-600 rounded-lg cursor-pointer">
                        Edit</button>
                    <button @click="promo.deletePromotion(promotion.id)"
                        class="px-3 py-1 text-sm bg-red-600 hover:bg-red-800 rounded-lg cursor-pointer">Delete</button>
                </div>
            </div>
        </div>

        <template #footer>
            <button @click="$emit('close')" class="px-4 py-2 border border-neutral-700 rounded hover:bg-neutral-800">Close</button>
        </template>
    </BaseModal>
    <AddPromoModal v-if="showAddPromoModal" @close="showAddPromoModal = false" @save="showAddPromoModal = false" />
    <EditPromoModal v-if="showEditItemModal" :item="itemEdit" @close="showEditItemModal = false"
        @save="showEditItemModal = false" />
</template>