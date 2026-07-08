<template>
  <div class="flex flex-wrap gap-3" v-if="completed.length > 0 || skipped.length > 0">
    <button
      v-if="completed.length > 0"
      @click="exportCompleted"
      class="px-4 py-2 rounded-lg text-xs font-semibold bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition-all duration-200 flex items-center gap-1.5"
    >
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
      Download Completed ({{ completed.length }})
    </button>
    <button
      v-if="skipped.length > 0"
      @click="exportSkipped"
      class="px-4 py-2 rounded-lg text-xs font-semibold bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200 transition-all duration-200 flex items-center gap-1.5"
    >
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
      Download Skipped ({{ skipped.length }})
    </button>
  </div>
</template>

<script setup>
import { downloadCSV } from '../utils/csvExport.js'

const props = defineProps({
  completed: { type: Array, default: () => [] },
  skipped: { type: Array, default: () => [] },
})

function exportCompleted() {
  downloadCSV(props.completed, `whatsapp-completed-${Date.now()}.csv`)
}

function exportSkipped() {
  downloadCSV(props.skipped, `whatsapp-skipped-${Date.now()}.csv`)
}
</script>
