import { defineStore } from 'pinia'
import { toRaw } from 'vue'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [], // [{ id, name, price, qty }]
        isCheckingOut: false,

        savedCarts: {}, // { [id]: { id, name, items, savedAt } }
        activeSavedCartId: null,
    }),

    getters: {
        itemCount: (state) => state.items.reduce((sum, i) => sum + i.qty, 0),

        total: (state) => state.items.reduce((sum, i) => sum + i.price * i.qty, 0),

        isEmpty: (state) => state.items.length === 0,

        savedCartList: (state) => Object.values(state.savedCarts).sort((a, b) => a.savedAt - b.savedAt),

        cartLoadName: (state) => state.savedCarts[state.activeSavedCartId]?.name ?? null,
    },

    actions: {
        addItem(product, qty = 1) {
            const existing = this.items.find(i => i.id === product.id)
            if (existing) {
                existing.qty += qty
            } else {
                this.items.push({ ...product, qty })
            }
        },

        removeItem(id) {
            this.items = this.items.filter(i => i.id !== id)
        },

        updateQty(id, qty) {
            const item = this.items.find(i => i.id === id)
            if (item) {
                item.qty = Math.max(1, qty)
            }
        },

        clearCart() {
            this.items = []
            this.activeSavedCartId = null
        },

        checkout() {
            this.isCheckingOut = true
            try {
                if (this.activeSavedCartId) {
                    this.deleteSavedCart(this.activeSavedCartId)
                }
                this.clearCart()
            } finally {
                this.isCheckingOut = false
            }
        },

        saveCurrentCart(name, existing) {
            const id = existing ? existing.id : Date.now().toString()
            this.savedCarts[id] = {
                id,
                name,
                items: structuredClone(toRaw(this.items)),
                savedAt: Date.now(),
            }

            return true
        },

        loadSavedCart(id) {
            const saved = this.savedCarts[id]
            if (!saved) return
            this.items = structuredClone(toRaw(saved.items))
            this.activeSavedCartId = id
        },

        deleteSavedCart(id) {
            delete this.savedCarts[id]
        },
    }
})