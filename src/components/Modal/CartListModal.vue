<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import BaseModal from './BaseModal.vue'

const cart = useCartStore()

const emit = defineEmits(['close', 'checkout'])

const load = (id) => {
    cart.loadSavedCart(id)
    emit('close')
}

const del = (id) => {
    cart.deleteSavedCart(id)
}

</script>

<template>
    <BaseModal width="w-[30%]" @close="emit('close')">
        <p class="text-xl font-semibold">Cart List</p>
        <table class="w-full p-1">
            <thead>
                <tr>
                    <th class="text-left">Name</th>
                    <th class="text-right">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in cart.savedCartList" :key="item.id">
                    <td>{{ index + 1 }}. {{ item.name }}</td>
                    <td class="text-right">
                        <div class="space-x-1">
                            <button @click="load(item.id)"
                                class="border-2 p-1 text-sm bg-neutral-700 hover:bg-neutral-600 rounded">
                                Load</button>
                            <button @click="del(item.id)"
                                class="border-2 p-1 text-sm bg-red-600 hover:bg-red-800 rounded">Remove</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </BaseModal>
</template>