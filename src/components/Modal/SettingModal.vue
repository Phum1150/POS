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
        <p class="text-xl mb-4">รายการโปรโมชั่น</p>
        <div class="flex flex-col gap-2">
            <div class="w-full flex justify-end">
                <button @click="openAddModal"
                    class="border px-2 py-1 self-end bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-md">
                    เพิ่ม +</button>
            </div>
            <div v-for="promotion in promo.promotions" class="border p-2 rounded flex justify-between">
                <div>
                    <p>ชื่อโปรโมชั่น: {{ promotion.name }}</p>
                    <p>ส่วนลด: {{ promotion.amount }}{{ promotion.type === 'percent' ? '%' : 'บาท' }}</p>
                    <p>ราคาขั้นต่ำ: {{ promotion.minPrice }}</p>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="flex gap-2">
                        <button @click="openEdit(promotion)"
                            class="border-2 p-1 text-sm bg-blue-600 hover:bg-blue-800 rounded">
                            แก้ไข</button>
                        <button @click="promo.deletePromotion(promotion.id)"
                            class="border-2 p-1 text-sm bg-red-600 hover:bg-red-800 rounded">ลบ</button>
                    </div>
                    <button @click="promo.togglePromotion(promotion.id)"
                        :class="promotion.isUse ? 'bg-green-600' : 'bg-red-600'"
                        class="border p-1 w-20 rounded-xl cursor-pointer">{{ promotion.isUse == true ? 'เปิด' : 'ปิด'
                        }}</button>
                </div>

            </div>
        </div>

        <template #footer>
            <button @click="$emit('close')" class="px-4 py-2 border rounded hover:bg-gray-900">Close</button>
        </template>
    </BaseModal>
    <AddPromoModal v-if="showAddPromoModal" @close="showAddPromoModal = false" @save="showAddPromoModal = false" />
    <EditPromoModal v-if="showEditItemModal" :item="itemEdit" @close="showEditItemModal = false"
        @save="showEditItemModal = false" />
</template>