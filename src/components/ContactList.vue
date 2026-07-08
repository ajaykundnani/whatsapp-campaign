<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-sm font-semibold text-gray-700">Contacts</h3>
      <span class="text-xs font-medium text-[#25D366] bg-green-50 px-2.5 py-1 rounded-full">
        {{ contacts.length }} total
      </span>
    </div>
    <div
      v-if="contacts.length === 0"
      class="text-sm text-gray-400 text-center py-8"
    >
      No contacts parsed yet. Paste numbers to begin.
    </div>
    <div
      v-else
      class="max-h-48 overflow-y-auto space-y-1 scrollbar-thin"
    >
      <div
        v-for="(phone, index) in contacts"
        :key="phone"
        :class="[
          'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition',
          completed.includes(phone)
            ? 'bg-green-50 text-green-700 line-through'
            : skipped.includes(phone)
              ? 'bg-yellow-50 text-yellow-700 line-through'
              : index === currentIndex && campaignActive && !paused
                ? 'bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-200'
                : 'text-gray-600 hover:bg-gray-50'
        ]"
      >
        <span class="text-xs text-gray-400 w-6 text-right shrink-0">{{ index + 1 }}.</span>
        <span class="font-mono text-xs">{{ phone }}</span>
        <button
          v-if="contactVariantMap[phone]"
          class="ml-1.5 p-1 rounded-full text-gray-400 hover:text-[#25D366] hover:bg-green-50 transition"
          @click="$emit('show-message', phone)"
          title="View sent message"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
        </button>
        <span v-if="completed.includes(phone)" class="ml-auto text-green-500 text-xs">Done</span>
        <span v-else-if="skipped.includes(phone)" class="ml-auto text-yellow-500 text-xs">Skipped</span>
        <span v-else-if="index === currentIndex && campaignActive" class="ml-auto text-blue-500 text-xs animate-pulse">Active</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  contacts: { type: Array, default: () => [] },
  completed: { type: Array, default: () => [] },
  skipped: { type: Array, default: () => [] },
  currentIndex: { type: Number, default: 0 },
  campaignActive: { type: Boolean, default: false },
  paused: { type: Boolean, default: false },
  contactVariantMap: { type: Object, default: () => ({}) },
})
defineEmits(['show-message'])
</script>
