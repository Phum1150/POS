import { defineStore } from 'pinia'
import { computed, toRaw } from 'vue'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const items = ref([])
    const isCheckingOut = ref(false)
    const savedCarts = ref({})
    const activeSavedCartId = ref(null)
    // state: () => ({
    //     items: [], // [{ id, name, price, qty }]
    //     isCheckingOut: false,

    //     savedCarts: {}, // { [id]: { id, name, items, savedAt } }
    //     activeSavedCartId: null,
    // }),

    const itemCount = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0))
    const total = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0))
    const isEmpty = computed(() => items.value.length === 0)
    const savedCartList = computed(() => Object.values(savedCarts.value).sort((a, b) => a.savedAt - b.savedAt))
    const cartLoadName = computed(() => savedCarts.value[activeSavedCartId.value]?.name ?? null)

    // getters: {
    //     itemCount: (state) => state.items.reduce((sum, i) => sum + i.qty, 0),

    //     total: (state) => state.items.reduce((sum, i) => sum + i.price * i.qty, 0),

    //     isEmpty: (state) => state.items.length === 0,

    //     savedCartList: (state) => Object.values(state.savedCarts).sort((a, b) => a.savedAt - b.savedAt),

    //     cartLoadName: (state) => state.savedCarts[state.activeSavedCartId]?.name ?? null,
    // },

    function addItem(product, qty = 1) {
        const existing = items.value.find(i => i.id === product.id)
        if (existing) {
            existing.qty += qty
        } else {
            items.value.push({ ...product, qty })
        }
    }

    function removeItem(id) {
        items.value = items.value.filter(i => i.id !== id)
    }

    function updateQty(id, qty) {
        const item = items.value.find(i => i.id === id)
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

    // actions: {
    //     addItem(product, qty = 1) {
    //         const existing = this.items.find(i => i.id === product.id)
    //         if (existing) {
    //             existing.qty += qty
    //         } else {
    //             this.items.push({ ...product, qty })
    //         }
    //     },

    //     removeItem(id) {
    //         this.items = this.items.filter(i => i.id !== id)
    //     },

    //     updateQty(id, qty) {
    //         const item = this.items.find(i => i.id === id)
    //         if (item) {
    //             item.qty = Math.max(1, qty)
    //         }
    //     },

    //     clearCart() {
    //         this.items = []
    //         this.activeSavedCartId = null
    //     },

    //     checkout() {
    //         this.isCheckingOut = true
    //         try {
    //             if (this.activeSavedCartId) {
    //                 this.deleteSavedCart(this.activeSavedCartId)
    //             }
    //             this.clearCart()
    //         } finally {
    //             this.isCheckingOut = false
    //         }
    //     },

    //     saveCurrentCart(name, existing) {
    //         const id = existing ? existing.id : Date.now().toString()
    //         this.savedCarts[id] = {
    //             id,
    //             name,
    //             items: structuredClone(toRaw(this.items)),
    //             savedAt: Date.now(),
    //         }

    //         return true
    //     },

    //     loadSavedCart(id) {
    //         const saved = this.savedCarts[id]
    //         if (!saved) return
    //         this.items = structuredClone(toRaw(saved.items))
    //         this.activeSavedCartId = id
    //     },

    //     deleteSavedCart(id) {
    //         delete this.savedCarts[id]
    //     },
    // }
})