<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import EditItemModal from './Modal/EditItemModal.vue';
import SummaryModal from './Modal/SummaryModal.vue';
import CartListModal from './Modal/CartListModal.vue';
import SaveCartModal from './Modal/SaveCartModal.vue';
import SettingModal from './Modal/SettingModal.vue';

const cart = useCartStore()
const showEditItemModal = ref(false)
const showSummaryModal = ref(false)
const showCartListModal = ref(false)
const showSaveCartModal = ref(false)
const showSettingModal = ref(false)
const itemEdit = ref({})
const CartName = ref('')

const openEdit = (item) => {
    itemEdit.value = item
    showEditItemModal.value = true
}

const openSummary = () => {
    showSummaryModal.value = true
}

const openCartList = () => {
    showCartListModal.value = true
}

const openSaveCart = () => {
    showSaveCartModal.value = true
}

const openSetting = () => {
    showSettingModal.value = true
}

const onLoadCart = (data) => {
    const items = data.items.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: Number(item.product.price),
        qty: item.quantity,
    }))
    cart.loadCart(data.name, items)
}

</script>

<template>
    <div class="col-span-2 h-full flex flex-col min-h-0">
        <div class="h-10 w-full flex items-center justify-between mb-1">
            <p class="text-2xl font-semibold">Order</p>
            <button @click="openSetting" class="border border-neutral-700 px-3 py-1 rounded-xl hover:bg-neutral-800 cursor-pointer font-semibold text-sm">
                Setting</button>
        </div>
        <div class="h-full p-1 flex flex-col border-2 border-neutral-700 rounded-2xl">
            <div class="overflow-y-auto h-full m-1">
                <table class="w-full">
                    <thead>
                        <tr class="text-xs uppercase tracking-wide text-neutral-400 border-b border-neutral-800">
                            <th class="text-left p-2 w-3/7">Name</th>
                            <th class="text-right p-2 w-1/7">Price</th>
                            <th class="text-right p-2 w-1/7">Qty</th>
                            <th class="text-right p-2 w-2/6">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-neutral-800">
                        <tr v-if="cart.isEmpty">
                            <td colspan="4" class="text-center text-neutral-500 py-8">ยังไม่มีสินค้าในตะกร้า</td>
                        </tr>
                        <tr v-for="(item, index) in cart.items" :key="item.id" class="hover:bg-neutral-900/60">
                            <td class="text-left p-2"> {{ index + 1 }}. {{ item.name }}</td>
                            <td class="text-right p-2">{{ item.price }} ฿</td>
                            <td class="text-right p-2">{{ item.qty }}</td>
                            <td class="text-right p-2">
                                <div class="flex justify-end gap-1">
                                    <button @click="openEdit(item)"
                                        class="px-2 py-1 text-sm bg-neutral-700 hover:bg-neutral-600 rounded cursor-pointer">
                                        Edit</button>
                                    <button @click="cart.removeItem(item.id)"
                                        class="px-2 py-1 text-sm bg-red-600 hover:bg-red-800 rounded cursor-pointer">Remove</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="w-full flex flex-col gap-2 p-2 sticky bottom-0 border-2 border-neutral-700 rounded-xl">
                <div class="flex items-center justify-between gap-2">
                    <div class="flex gap-2">
                        <button @click="openSaveCart" :disabled="cart.isEmpty"
                            class="font-semibold px-4 py-2 bg-amber-500 text-black rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer enabled:hover:bg-amber-600">
                            Save Cart</button>
                        <button @click="openCartList"
                            class="font-semibold px-4 py-2 bg-amber-500 text-black rounded-xl text-sm cursor-pointer hover:bg-amber-600">
                            Cart Lists</button>
                    </div>
                    <p v-if="cart.cartLoadName" class="text-sm text-neutral-400">Loaded: {{ cart.cartLoadName }}</p>
                </div>
                <div class="flex items-center justify-between gap-2 border-t border-neutral-800 pt-2">
                    <div class="flex flex-col">
                        <p class="text-sm text-neutral-400">Total Items: {{ cart.itemCount }}</p>
                        <p class="text-2xl font-bold text-amber-500">{{ cart.total }} ฿</p>
                    </div>
                    <div class="flex gap-2">
                        <button @click="cart.clearCart" :disabled="cart.isEmpty"
                            class="font-semibold px-4 py-2 bg-neutral-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer enabled:hover:bg-neutral-600">
                            Clear</button>
                        <button @click="openSummary" :disabled="cart.isEmpty"
                            class="font-semibold px-4 py-2 bg-amber-500 text-black rounded-xl disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer enabled:hover:bg-amber-600">
                            Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <EditItemModal v-if="showEditItemModal" :item="itemEdit" @close="showEditItemModal = false"
        @save="showEditItemModal = false" />
    <SummaryModal v-if="showSummaryModal" @close="showSummaryModal = false" @checkout="showSummaryModal = false" />
    <CartListModal v-if="showCartListModal" @close="showCartListModal = false" @load="onLoadCart" />
    <SaveCartModal v-if="showSaveCartModal" @close="showSaveCartModal = false" @save="showSaveCartModal = false" />
    <SettingModal v-if="showSettingModal" @close="showSettingModal= false" />

</template>