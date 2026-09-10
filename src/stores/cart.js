import { defineStore } from 'pinia'
import { computed } from 'vue'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const items = ref([])
    const isCheckingOut = ref(false)
    const cartLoadName = ref(null)

    const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.qty, 0))
    const total = computed(() => items.value.reduce((sum, item) => sum + (item.price * item.qty), 0))
    const isEmpty = computed(() => items.value.length === 0)

    function addItem(product, qty = 1) {
        const existing = items.value.find(item => item.id === product.id)
        if (existing) {
            existing.qty += qty
        } else {
            items.value.push({ ...product, qty })
        }
    }

    function removeItem(id) {
        items.value = items.value.filter(item => item.id !== id)
    }

    function updateQty(id, qty) {
        const item = items.value.find(item => item.id === id)
        if (item) {
            item.qty = Math.max(1, qty)
        }
    }

    function clearCart() {
        items.value = []
        cartLoadName.value = null
    }

    function checkout() {
        isCheckingOut.value = true
        try {
            clearCart()
        } finally {
            isCheckingOut.value = false
        }
    }

    function loadCart(name, cartItems) {
        items.value = cartItems
        cartLoadName.value = name
    }

    return {
        items, isCheckingOut, cartLoadName,
        itemCount, total, isEmpty,
        addItem, removeItem, updateQty, clearCart, checkout, loadCart
    }
})