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

</script>

<template>
    <div class="col-span-2 h-full flex flex-col min-h-0">
        <div class="h-10 w-full flex justify-end">
            <button @click="openSetting" class="border p-1 rounded-xl m-1 bg-gray-500 hover:bg-gray-600 cursor-pointer font-semibold">
                Setting</button>
        </div>
        <div class="h-full p-1 flex flex-col border-2 rounded-2xl">
            <div class="overflow-y-auto h-full m-1">
                <table class="w-full">
                    <thead>
                        <tr>
                            <th class="text-left p-2 w-3/7">Name</th>
                            <th class="text-right p-2 w-1/7">Price</th>
                            <th class="text-right p-2 w-1/7">Qty</th>
                            <th class="text-right p-2 w-2/6">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in cart.items" :key="item.id">
                            <td class="text-left p-1"> {{ index + 1 }}. {{ item.name }}</td>
                            <td class="text-right p-1">{{ item.price }}</td>
                            <td class="text-right p-1">{{ item.qty }}</td>
                            <td class="text-right p-1">
                                <div class="space-x-1">
                                    <button @click="openEdit(item)"
                                        class="border-2 p-1 text-sm bg-blue-600 hover:bg-blue-800 rounded">
                                        Edit</button>
                                    <button @click="cart.removeItem(item.id)"
                                        class="border-2 p-1 text-sm bg-red-600 hover:bg-red-800 rounded">Remove</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="w-full flex justify-between p-2 sticky bottom-0 gap-2 border-2 rounded-xl">
                <div class="flex gap-2 items-end">
                    <button @click="openSaveCart" :disabled="cart.isEmpty"
                        class="font-semibold border-2 px-4 py-2 bg-blue-400 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer enabled:hover:bg-blue-600">
                        Save Cart</button>
                    <button @click="openCartList"
                        class="font-semibold border-2 px-4 py-2 bg-blue-400 rounded-2xl cursor-pointer hover:bg-blue-600">
                        Cart Lists</button>
                    <p v-if="cart.cartLoadName">Loaded: {{ cart.cartLoadName }}</p>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="flex flex-col gap-2 border-2 p-2 rounded-xl">
                        <p>Total Items: {{ cart.itemCount  }}</p>
                        <p>Total Price: {{ cart.total }}</p>
                    </div>
                    <div class="flex gap-2">
                        <button @click="cart.clearCart" :disabled="cart.isEmpty"
                            class="font-semibold border-2 px-4 py-2 bg-gray-400 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer enabled:hover:bg-gray-600">
                            Clear</button>
                        <button @click="openSummary" :disabled="cart.isEmpty"
                            class="font-semibold border-2 px-4 py-2 bg-green-400 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer enabled:hover:bg-green-600">
                            Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <EditItemModal v-if="showEditItemModal" :item="itemEdit" @close="showEditItemModal = false"
        @save="showEditItemModal = false" />
    <SummaryModal v-if="showSummaryModal" @close="showSummaryModal = false" @checkout="showSummaryModal = false" />
    <CartListModal v-if="showCartListModal" @close="showCartListModal = false" />
    <SaveCartModal v-if="showSaveCartModal" @close="showSaveCartModal = false" @save="showSaveCartModal = false" />
    <SettingModal v-if="showSettingModal" @close="showSettingModal= false" />

</template>