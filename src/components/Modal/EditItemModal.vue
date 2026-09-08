<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import BaseModal from './BaseModal.vue'

const cart = useCartStore()
const props = defineProps({
    item: Object,
})

const emit = defineEmits(['close', 'save'])
const NewQty = ref(props.item.qty)

const save = () => {
    cart.updateQty(props.item.id, Number(NewQty.value))
    emit('save')
}
</script>

<template>
    <BaseModal width="w-[20%]">
        <p class="mb-2">{{ props.item.name }}</p>

        <input v-model="NewQty" type="number" min="1" class="w-full p-2 border border-neutral-700 bg-neutral-900 rounded mb-2" placeholder="Quantity..." />

        <template #footer>
            <button @click="$emit('close')" class="px-4 py-2 border border-neutral-700 rounded hover:bg-neutral-800">Cancel</button>
            <button @click="save" class="bg-amber-500 text-black px-4 py-2 rounded hover:bg-amber-600">Save</button>
        </template>
    </BaseModal>
</template>