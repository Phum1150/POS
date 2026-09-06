<script setup>

const props = defineProps({
    width: { type: String, default: 'w-[30%]' } // เช่น 'w-[20%]', 'w-96'
})

</script>

<template>
    <Teleport to="body">
        <div class="fixed inset-0 flex items-center justify-center bg-black/50">
            <div :class="['p-6 rounded border', width]">

                <slot />

                <div class="flex justify-end gap-2 mt-4">
                    <slot name="footer">
                        <!-- default footer ถ้าไม่ส่งอะไรมา -->
                        <button @click="$emit('close')">Cancel</button>
                    </slot>
                </div>

            </div>
        </div>
    </Teleport>
</template>