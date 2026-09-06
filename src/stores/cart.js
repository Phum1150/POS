import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        isCheckingOut: false
    }),

    getters: {
        itemCount: (state) => state.items.reduce((sum, i) => sum + i.qty, 0),

        total: (state) => state.items.reduce((sum, i) => sum + i.price * i.qty, 0),

        isEmpty: (state) => state.items.length === 0,
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
            this.discountPercent = 0
        },

        checkout() {
            this.isCheckingOut = true
            try {
                this.clearCart()
            } finally {
                this.isCheckingOut = false
            }
        }
    }
})