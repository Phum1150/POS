<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import BaseModal from './BaseModal.vue'

const cart = useCartStore()
const props = defineProps({
    show: Boolean,
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
        <p>{{ props.item.name }}</p>

        <input v-model="NewQty" type="number" min="1" class="w-full p-2 border rounded mb-2" placeholder="Quantity..." />

        <template #footer>
            <button @click="$emit('close')" class="px-4 py-2 border rounded hover:bg-gray-900">Cancel</button>
            <button @click="save" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save</button>
        </template>
    </BaseModal>
</template>