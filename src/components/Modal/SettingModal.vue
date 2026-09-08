<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
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
        <p class="text-xl mb-4">Promotion Lists</p>
        <div class="flex flex-col gap-2">
            <div class="w-full flex justify-end">
                <button @click="openAddModal"
                    class="border px-2 py-1 self-end bg-amber-500 text-black hover:bg-amber-600 cursor-pointer rounded-md">
                    Add +</button>
            </div>
            <div v-for="promotion in promo.promotions" class="border border-neutral-700 p-2 rounded flex justify-between">
                <div>
                    <p>Promotion Name : {{ promotion.name }}</p>
                    <p>Discount : {{ promotion.amount }}{{ promotion.type === 'percent' ? '%' : 'บาท' }}</p>
                    <p>Minimun Price : {{ promotion.minPrice }}</p>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="flex gap-2">
                        <button @click="openEdit(promotion)"
                            class="border p-1 text-sm bg-neutral-700 hover:bg-neutral-600 rounded">
                            Edit</button>
                        <button @click="promo.deletePromotion(promotion.id)"
                            class="border p-1 text-sm bg-red-600 hover:bg-red-800 rounded">Delete</button>
                    </div>
                    <button @click="promo.togglePromotion(promotion.id)"
                        :class="promotion.isUse ? 'bg-green-600' : 'bg-red-600'"
                        class="border p-1 w-full rounded-xl cursor-pointer">{{ promotion.isUse == true ? 'ON' : 'OFF'
                        }}</button>
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