<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    <h3 class="text-sm font-semibold text-gray-700 mb-4">Statistics</h3>
    <div class="grid grid-cols-2 gap-3">
      <div class="bg-gray-50 rounded-lg px-4 py-3">
        <p class="text-2xl font-bold text-gray-800">{{ total }}</p>
        <p class="text-xs text-gray-500">Total Contacts</p>
      </div>
      <div class="bg-green-50 rounded-lg px-4 py-3">
        <p class="text-2xl font-bold text-green-600">{{ completed }}</p>
        <p class="text-xs text-gray-500">Completed</p>
      </div>
      <div class="bg-yellow-50 rounded-lg px-4 py-3">
        <p class="text-2xl font-bold text-yellow-600">{{ skipped }}</p>
        <p class="text-xs text-gray-500">Skipped</p>
      </div>
      <div class="bg-blue-50 rounded-lg px-4 py-3">
        <p class="text-2xl font-bold text-blue-600">{{ remaining }}</p>
        <p class="text-xs text-gray-500">Remaining</p>
      </div>
      <div v-if="duplicateCount > 0" class="bg-orange-50 rounded-lg px-4 py-3">
        <p class="text-2xl font-bold text-orange-600">{{ duplicateCount }}</p>
        <p class="text-xs text-gray-500">Duplicates Excluded</p>
      </div>
    </div>
    <div class="mt-3 flex items-center gap-2">
      <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          class="h-full bg-[#25D366] rounded-full transition-all duration-500"
          :style="{ width: percent + '%' }"
        ></div>
      </div>
      <span class="text-xs font-medium text-gray-500">{{ percent }}%</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  total: { type: Number, default: 0 },
  completed: { type: Number, default: 0 },
  skipped: { type: Number, default: 0 },
  remaining: { type: Number, default: 0 },
  percent: { type: Number, default: 0 },
  duplicateCount: { type: Number, default: 0 },
})
</script>
