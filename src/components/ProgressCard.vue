<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    <h3 class="text-sm font-semibold text-gray-700 mb-4">Progress</h3>
    <div v-if="campaignActive && currentContact" class="space-y-4">
      <div class="flex items-center gap-3 bg-green-50 rounded-lg px-4 py-3">
        <div class="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white text-sm font-bold shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        </div>
        <div>
          <p class="text-xs text-gray-500">Current Contact</p>
          <p class="font-mono text-sm font-semibold text-gray-800">{{ currentContact }}</p>
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between text-xs text-gray-500 mb-1.5">
          <span>{{ completed + skipped }} / {{ total }} completed</span>
          <span>{{ percent }}%</span>
        </div>
        <div class="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            class="h-full bg-[#25D366] rounded-full transition-all duration-500 ease-out"
            :style="{ width: percent + '%' }"
          ></div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-3 text-center">
        <div class="bg-green-50 rounded-lg px-3 py-2">
          <p class="text-lg font-bold text-green-600">{{ completed }}</p>
          <p class="text-xs text-gray-500">Completed</p>
        </div>
        <div class="bg-yellow-50 rounded-lg px-3 py-2">
          <p class="text-lg font-bold text-yellow-600">{{ skipped }}</p>
          <p class="text-xs text-gray-500">Skipped</p>
        </div>
        <div class="bg-blue-50 rounded-lg px-3 py-2">
          <p class="text-lg font-bold text-blue-600">{{ total - completed - skipped }}</p>
          <p class="text-xs text-gray-500">Remaining</p>
        </div>
      </div>
    </div>
    <div v-else class="text-sm text-gray-400 text-center py-6">
      {{ campaignActive && paused ? 'Campaign paused' : 'Start a campaign to see progress' }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentContact: { type: String, default: null },
  total: { type: Number, default: 0 },
  completed: { type: Number, default: 0 },
  skipped: { type: Number, default: 0 },
  percent: { type: Number, default: 0 },
  campaignActive: { type: Boolean, default: false },
})
</script>
