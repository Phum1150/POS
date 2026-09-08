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
        <p class="text-xl font-semibold border-b border-neutral-800 pb-3 mb-4">Edit Promotion</p>
        <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-1">
                <label for="ProName" class="text-sm text-neutral-400">Promotion Name</label>
                <input id="ProName" v-model="name" type="text"
                    class="w-full p-2 border border-neutral-700 bg-neutral-900 rounded-lg focus:border-amber-500 outline-none" />
            </div>
            <div class="flex flex-col gap-1">
                <label for="ProType" class="text-sm text-neutral-400">Type</label>
                <select id="ProType" v-model="type"
                    class="w-full p-2 border border-neutral-700 bg-neutral-900 rounded-lg focus:border-amber-500 outline-none">
                    <option class="bg-neutral-900" value="percent">Percent</option>
                    <option class="bg-neutral-900" value="fixed">Fixed</option>
                </select>
            </div>
            <div class="grid grid-cols-2 gap-3">
                <div class="flex flex-col gap-1">
                    <label for="ProAmount" class="text-sm text-neutral-400">Discount</label>
                    <input id="ProAmount" v-model.number="amount" type="number" min="0"
                        class="w-full p-2 border border-neutral-700 bg-neutral-900 rounded-lg focus:border-amber-500 outline-none" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="ProMinAmount" class="text-sm text-neutral-400">Minimum Price</label>
                    <input id="ProMinAmount" v-model.number="minPrice" type="number" min="0"
                        class="w-full p-2 border border-neutral-700 bg-neutral-900 rounded-lg focus:border-amber-500 outline-none" />
                </div>
            </div>
        </div>

        <template #footer>
            <button @click="$emit('close')" class="px-4 py-2 border border-neutral-700 rounded hover:bg-neutral-800">Close</button>
            <button @click="save" class="bg-amber-500 text-black px-4 py-2 rounded hover:bg-amber-600">Save</button>
        </template>
    </BaseModal>
</template>