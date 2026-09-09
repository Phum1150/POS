<script setup>
import { computed, ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { usePromotionStore } from '@/stores/promotion.js'
import BaseModal from './BaseModal.vue'

const cart = useCartStore()
const promo = usePromotionStore()
const selectedPromotionId = ref('')

const totalPrice = computed(() => {
    if (selectedPromotionId.value){
        const finalPrice = promo.usePromotion(selectedPromotionId.value, cart.total)
        return finalPrice.value
    }
    return cart.total
})

const discount = computed(() => cart.total - totalPrice.value)

const emit = defineEmits(['close', 'checkout'])

const checkout = () => {
    cart.checkout()
    emit('checkout')
}
</script>

<template>
    <BaseModal width="w-[20%]">
        <div class="flex flex-col gap-4">
            <p class="text-xl font-semibold border-b border-neutral-800 pb-3">Summary</p>

            <div class="flex flex-col gap-1 text-sm text-neutral-400">
                <p class="flex justify-between"><span>Total Items</span><span class="text-white">{{ cart.itemCount }}</span></p>
                <p class="flex justify-between"><span>Base Price</span><span class="text-white">{{ cart.total }} ฿</span></p>
            </div>

            <div class="flex flex-col gap-1">
                <label for="promotion" class="text-sm text-neutral-400">เลือก Promotion</label>
                <select id="promotion" v-model="selectedPromotionId"
                    class="border border-neutral-700 bg-neutral-900 rounded-lg px-2 py-2 text-sm focus:border-amber-500 outline-none">
                    <option class="bg-neutral-900" value="">ไม่ใช้โปรโมชั่น</option>
                    <option class="bg-neutral-900" v-for="promotion in promo.promotionLists.filter(i => i.minPrice <= cart.total)"
                        :key="promotion.id" :value="promotion.id">
                        {{ promotion.name }}
                    </option>
                </select>
            </div>

            <div class="flex flex-col gap-1 text-sm border-t border-neutral-800 pt-3">
                <p v-if="discount > 0" class="flex justify-between text-green-500">
                    <span>Discount</span><span>-{{ discount }} ฿</span>
                </p>
                <p class="flex justify-between items-baseline">
                    <span class="text-neutral-400">Total Price</span>
                    <span class="text-2xl font-bold text-amber-500">{{ totalPrice }} ฿</span>
                </p>
            </div>
        </div>

        <template #footer>
            <button @click="$emit('close')" class="px-4 py-2 border border-neutral-700 rounded hover:bg-neutral-800">Cancel</button>
            <button @click="checkout"
                class="bg-amber-500 text-black px-4 py-2 rounded hover:bg-amber-600">Checkout</button>
        </template>
    </BaseModal>
</template>