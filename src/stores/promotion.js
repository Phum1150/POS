import { defineStore } from 'pinia'
import { computed, toRaw } from 'vue'
import { ref } from 'vue'

export const usePromotionStore = defineStore('promotion', () => {
    const promotions = ref([
        { id: 1, name: "ลด 10% เมื่อซื้อครบ 500", type: "percent", amount: 10, minPrice: 500, isUse: true },
    ]) //[{id, name, type: 'fixed' | 'percent', amount, minPrice, isUse}]

    const promotionLists = computed(() => promotions.value.filter(promotion => promotion.isUse === true))
    const promotionCount = computed(() => promotions.value.reduce((sum, promotion) => sum + promotion.qty, 0))

    function togglePromotion(id) {
        const promotion = promotions.value.find(promotion => promotion.id === id)
        if (promotion) {
            promotion.isUse = !promotion.isUse
        }
    }

    function UsePromotion(id, totalPrice) {
        const promo = promotionLists.value.find(promotion => promotion.id === id)
        const finalPrice = ref(0)

        if (promo.type == 'percent') {
            finalPrice.value = totalPrice - ((totalPrice * promo.amount) / 100)
        } else if (promo.type == 'fixed') {
            finalPrice.value = totalPrice - promo.amount
        }
        return finalPrice
    }

    function addPromotion(newPromotion) {
        promotions.value.push(newPromotion)
    }

    function updatePromotion(updPro) {
        const index = promotions.value.findIndex(promotion => promotion.id === updPro.id)
        if (index !== -1) {
            promotions.value[index] = { ...promotions.value[index], ...updPro }
        }
    }


    function deletePromotion(id) {
        promotions.value = promotions.value.filter(promotion => promotion.id !== id)
    }

    return {
        promotions,
        promotionLists,
        promotionCount,
        togglePromotion,
        UsePromotion,
        addPromotion,
        updatePromotion,
        deletePromotion,
    }
})