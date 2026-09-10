import { defineStore } from 'pinia'
import { computed } from 'vue'
import { ref } from 'vue'

export const usePromotionStore = defineStore('promotion', () => {
    const promotions = ref([
        { id: 1, name: "ลด 10% เมื่อซื้อครบ 200", type: "percent", amount: 10, minPrice: 200, isUse: true },
    ]) //[{id, name, type: 'fixed' | 'percent', amount, minPrice, isUse}]

    const promotionLists = computed(() => promotions.value.filter(promotion => promotion.isUse))
    const promotionCount = computed(() => promotions.value.reduce((sum, promotion) => sum + promotion.qty, 0))

    function togglePromotion(id) {
        const promotion = promotions.value.find(promotion => promotion.id === id)
        if (promotion) {
            promotion.isUse = !promotion.isUse
        }
    }

    function usePromotion(id, totalPrice) {
        const promo = promotionLists.value.find(promotion => promotion.id === id)
        const finalPrice = ref(0)

        if (promo.type === 'percent') {
            finalPrice.value = totalPrice - ((totalPrice * promo.amount) / 100)
        } else if (promo.type === 'fixed') {
            finalPrice.value = totalPrice - promo.amount
        }
        return finalPrice
    }

    function addPromotion(newPromotion) {
        promotions.value.push(newPromotion)
    }

    function updatePromotion(updatedPromotion) {
        const index = promotions.value.findIndex(promotion => promotion.id === updatedPromotion.id)
        if (index !== -1) {
            promotions.value[index] = { ...promotions.value[index], ...updatedPromotion }
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
        usePromotion,
        addPromotion,
        updatePromotion,
        deletePromotion,
    }
})