<script setup>

const props = defineProps({
    width: { type: String, default: 'w-[30%]' } // เช่น 'w-[20%]', 'w-96'
})

defineEmits(['close'])

</script>

<template>
    <Teleport to="body">
        <div class="fixed inset-0 flex items-center justify-center bg-black/50">
            <div :class="['p-6 rounded border border-neutral-700 bg-neutral-900', width]">

                <slot />

                <div class="flex justify-end gap-2 mt-4">
                    <slot name="footer">
                        <!-- default footer ถ้าไม่ส่งอะไรมา -->
                        <button @click="$emit('close')" class="px-4 py-2 border border-neutral-700 rounded hover:bg-neutral-800">Cancel</button>
                    </slot>
                </div>

            </div>
        </div>
    </Teleport>
</template>