<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    <label class="block text-sm font-semibold text-gray-700 mb-2">
      Message
    </label>
    <textarea
      :value="modelValue"
      @input="handleInput"
      placeholder="Write your WhatsApp message here...&#10;&#10;Example:&#10;Hello,&#10;&#10;We have launched our new product.&#10;&#10;If you're interested, please reply.&#10;&#10;Thank you."
      class="w-full h-32 px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent transition resize-y placeholder:text-gray-400"
    ></textarea>
    <div class="flex items-center justify-between mt-2">
      <p class="text-xs text-gray-400">
        Supports plain text, emoji, and multiple lines.
      </p>
      <span class="text-xs text-gray-400">{{ modelValue.length }} chars</span>
    </div>
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
