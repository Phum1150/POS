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
        const finalPrice = promo.UsePromotion(selectedPromotionId.value, cart.total)
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
        <div class="flex flex-col gap-3">
            <p class="text-xl font-semibold border-b border-neutral-700 pb-2">Summary</p>

            <div class="flex flex-col gap-1 text-sm">
                <p class="flex justify-between"><span>Total Items</span><span>{{ cart.itemCount }}</span></p>
                <p class="flex justify-between"><span>Base Price</span><span>{{ cart.total }}</span></p>
            </div>

            <div class="flex flex-col gap-1">
                <label for="promotion" class="text-sm">เลือก Promotion</label>
                <select id="promotion" v-model="selectedPromotionId"
                    class="border border-neutral-700 bg-neutral-900 rounded px-2 py-1 text-sm">
                    <option class="bg-neutral-900" value="">ไม่ใช้โปรโมชั่น</option>
                    <option class="bg-neutral-900" v-for="promotion in promo.promotionLists.filter(i => i.minPrice <= cart.total)"
                        :key="promotion.id" :value="promotion.id">
                        {{ promotion.name }}
                    </option>
                </select>
            </div>

            <div class="flex flex-col gap-1 text-sm border-t border-neutral-700 pt-2">
                <p class="flex justify-between"><span>Discount</span><span>{{ discount }}</span></p>
                <p class="flex justify-between text-lg font-semibold"><span>Total Price</span><span>{{ totalPrice }}</span></p>
            </div>
        </div>

        <template #footer>
            <button @click="$emit('close')" class="px-4 py-2 border border-neutral-700 rounded hover:bg-neutral-800">Cancel</button>
            <button @click="checkout"
                class="bg-amber-500 text-black px-4 py-2 rounded hover:bg-amber-600">Checkout</button>
        </template>
    </BaseModal>
</template>