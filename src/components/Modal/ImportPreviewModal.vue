<script setup>
import { ref, computed } from 'vue'
import BaseModal from './BaseModal.vue'

const props = defineProps({
    rows: { type: Array, required: true } // [{ name, price, type, isActive, isDuplicate }]
})

const emit = defineEmits(['close', 'confirm'])

const importing = ref(false)
const duplicateCount = computed(() => props.rows.filter((row) => row.isDuplicate).length)
const importCount = computed(() => props.rows.length - duplicateCount.value)

const confirmImport = async () => {
    importing.value = true
    try {
        await emit('confirm', props.rows.filter((row) => !row.isDuplicate))
    } finally {
        importing.value = false
    }
}
</script>

<template>
    <BaseModal width="w-[70%]">
        <p class="text-xl font-semibold border-b border-neutral-800 pb-3 mb-3">ตรวจสอบข้อมูลก่อนนำเข้า</p>
        <p class="text-sm text-neutral-400 mb-3">
            ทั้งหมด {{ rows.length }} รายการ — นำเข้าได้ {{ importCount }} รายการ
            <span v-if="duplicateCount > 0" class="text-amber-500">
                (ชื่อซ้ำกับสินค้าที่มีอยู่แล้ว {{ duplicateCount }} รายการ จะไม่ถูกนำเข้า)
            </span>
        </p>
        <div class="max-h-[50vh] overflow-y-auto border border-neutral-800 rounded-lg">
            <table class="w-full text-sm">
                <thead class="sticky top-0 bg-neutral-900">
                    <tr class="text-left text-neutral-400 border-b border-neutral-800">
                        <th class="p-2">ชื่อสินค้า</th>
                        <th class="p-2">ราคา</th>
                        <th class="p-2">ประเภท</th>
                        <th class="p-2">สถานะ</th>
                        <th class="p-2">หมายเหตุ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in rows" :key="index"
                        class="border-b border-neutral-800 last:border-0"
                        :class="row.isDuplicate ? 'text-neutral-500' : ''">
                        <td class="p-2">{{ row.name }}</td>
                        <td class="p-2">{{ row.price }} ฿</td>
                        <td class="p-2">{{ row.type }}</td>
                        <td class="p-2">{{ row.isActive ? 'แสดง' : 'ไม่แสดง' }}</td>
                        <td class="p-2">
                            <span v-if="row.isDuplicate" class="text-amber-500">ชื่อซ้ำ - ข้าม</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <template #footer>
            <button @click="$emit('close')"
                class="px-4 py-2 border border-neutral-700 rounded hover:bg-neutral-800">Cancel</button>
            <button @click="confirmImport" :disabled="importing || importCount === 0"
                class="bg-amber-500 text-black px-4 py-2 rounded hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed">
                {{ importing ? 'กำลังนำเข้า...' : `Confirm Import (${importCount})` }}</button>
        </template>
    </BaseModal>
</template>
