<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import BaseModal from './BaseModal.vue'
import { usePromotionStore } from '@/stores/promotion.js'

const cart = useCartStore()
const promo = usePromotionStore()
const props = defineProps({
    item: Object,
})

const emit = defineEmits(['close', 'save'])

const name = ref(props.item.name)
const type = ref(props.item.type)
const amount = ref(props.item.amount)
const minPrice = ref(props.item.minPrice)

const save = () => {
    promo.updatePromotion({
        id: props.item.id, 
        name: name.value,
        type: type.value,
        amount: amount.value,
        minPrice: minPrice.value,
    })
    emit('save')
}

</script>

<template>
    <BaseModal width="w-[30%]">
        <p class="text-xl mb-4">แก้ไขรายการ</p>
        <div class="flex flex-col gap-2">
            <label for="ProName">ชื่อโปรโมชั่น</label>
            <input id="ProName" v-model="name" type="text" class="w-full p-2 border rounded mb-2" />
            <label for="ProType">รูปแบบ</label>
            <select id="ProType" v-model="type" class="w-full p-2 border rounded mb-2">
                <option class="bg-black" value="percent">เปอร์เซ็นต์</option>
                <option class="bg-black" value="fixed">ลดราคาคงที่</option>
            </select>
            <label for="ProAmount">ส่วนลด</label>
            <input id="ProAmount" v-model.number="amount" type="number" min="0" class="w-full p-2 border rounded mb-2" />
            <label for="ProMinAmount">ยอดซื้อขั้นต่ำ</label>
            <input id="ProMinAmount" v-model.number="minPrice" type="number" min="0" class="w-full p-2 border rounded mb-2" />
        </div>

        <template #footer>
            <button @click="$emit('close')" class="px-4 py-2 border rounded hover:bg-gray-900">Close</button>
            <button @click="save" class="px-4 py-2 border rounded hover:bg-gray-900">Save</button>
        </template>
    </BaseModal>
</template>