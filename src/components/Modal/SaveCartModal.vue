<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import BaseModal from './BaseModal.vue'

const cart = useCartStore()
const props = defineProps({
    show: Boolean,
    items: Object,
})

const emit = defineEmits(['close', 'checkout'])

</script>

<template>
    <BaseModal width="w-[30%]">
        <p class="text-xl font-semibold">Save Cart</p>

        <template #footer>
            <button @click="$emit('close')" class="px-4 py-2 border rounded hover:bg-gray-900">Cancel</button>
            <button @click="" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save</button>
        </template>
    </BaseModal>
</template>