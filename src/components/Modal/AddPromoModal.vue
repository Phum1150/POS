<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import BaseModal from './BaseModal.vue'
import { usePromotionStore } from '@/stores/promotion.js'

const promo = usePromotionStore()

const emit = defineEmits(['close', 'save'])

const name = ref('')
const type = ref('percent')
const amount = ref(0)
const minPrice = ref(0)

const save = () => {
    promo.addPromotion({
        id: Date.now(),
        name: name.value,
        type: type.value,
        amount: amount.value,
        minPrice: minPrice.value,
        isUse: true,
    })
    emit('save')
}

</script>

<template>
    <BaseModal width="w-[30%]">
        <p class="text-xl mb-4">Add Promotion</p>
        <div class="flex flex-col gap-2">
            <label for="ProName">Promotion Name</label>
            <input id="ProName" v-model="name" type="text" class="w-full p-2 border border-neutral-700 bg-neutral-900 rounded mb-2" />
            <label for="ProType">Type</label>
            <select id="ProType" v-model="type" class="w-full p-2 border border-neutral-700 bg-neutral-900 rounded mb-2">
                <option class="bg-neutral-900" value="percent">Percent</option>
                <option class="bg-neutral-900" value="fixed">Fixed</option>
            </select>
            <label for="ProAmount">Discount</label>
            <input id="ProAmount" v-model.number="amount" type="number" min="0" class="w-full p-2 border border-neutral-700 bg-neutral-900 rounded mb-2" />
            <label for="ProMinAmount">Minimum Price</label>
            <input id="ProMinAmount" v-model.number="minPrice" type="number" min="0" class="w-full p-2 border border-neutral-700 bg-neutral-900 rounded mb-2" />
        </div>

        <template #footer>
            <button @click="$emit('close')" class="px-4 py-2 border border-neutral-700 rounded hover:bg-neutral-800">Close</button>
            <button @click="save" class="bg-amber-500 text-black px-4 py-2 rounded hover:bg-amber-600">Save</button>
        </template>
    </BaseModal>
</template>