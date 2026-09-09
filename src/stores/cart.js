import { defineStore } from 'pinia'
import { computed } from 'vue'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const items = ref([])
    const isCheckingOut = ref(false)
    const savedCarts = ref({})
    const activeSavedCartId = ref(null)

    const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.qty, 0))
    const total = computed(() => items.value.reduce((sum, item) => sum + (item.price * item.qty), 0))
    const isEmpty = computed(() => items.value.length === 0)
    const savedCartList = computed(() => Object.values(savedCarts.value).sort((a, b) => a.savedAt - b.savedAt))
    const cartLoadName = computed(() => savedCarts.value[activeSavedCartId.value]?.name ?? null)

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
        activeSavedCartId.value = null
    }

    function checkout() {
        isCheckingOut.value = true
        try {
            if (activeSavedCartId.value) {
                deleteSavedCart(activeSavedCartId.value)
            }
            clearCart()
        } finally {
            isCheckingOut.value = false
        }
    }

    function saveCurrentCart(name, existing) {
        const id = existing ? existing.id : Date.now().toString()
        savedCarts.value[id] = {
            id,
            name,
            items: items.value,
            savedAt: Date.now(),
        }

        return true
    }

    function loadSavedCart(id) {
        const saved = savedCarts.value[id]
        if (!saved) return
        items.value = saved.items
        activeSavedCartId.value = id
    }

    function deleteSavedCart(id) {
        delete savedCarts.value[id]
    }

    return {
        items, isCheckingOut, savedCarts, activeSavedCartId, 
        itemCount, total, isEmpty, savedCartList,  cartLoadName,
        addItem, removeItem, updateQty, clearCart, checkout, 
        saveCurrentCart, loadSavedCart, deleteSavedCart
    }
})