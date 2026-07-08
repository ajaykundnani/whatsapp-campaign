<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    <label class="block text-sm font-semibold text-gray-700 mb-2">
      Paste Phone Numbers
    </label>
    <textarea
      :value="modelValue"
      @input="handleInput"
      placeholder="Paste phone numbers here (one per line)&#10;e.g.&#10;919876543210&#10;+91 98765 43210&#10;919876543210, John Doe"
      class="w-full h-40 px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent transition resize-y placeholder:text-gray-400"
    ></textarea>
    <p class="text-xs text-gray-400 mt-2">
      Supports Excel, CSV, Google Sheets paste. Extracts phone numbers automatically.
    </p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])
function handleInput(e) {
  emit('update:modelValue', e.target.value)
}
</script>
