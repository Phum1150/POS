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
    <BaseModal width="w-[30%]" @close="emit('close')">
        <p class="text-xl font-semibold">Cart List</p>

    </BaseModal>
</template>