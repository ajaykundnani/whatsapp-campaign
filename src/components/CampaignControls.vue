<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    <div class="flex flex-wrap gap-3">
      <button
        v-if="!campaignActive"
        @click="$emit('start')"
        :disabled="!canStart"
        :class="[
          'px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2',
          canStart
            ? 'bg-[#25D366] text-white hover:bg-[#1ebe5a] shadow-sm hover:shadow-md active:scale-95'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        ]"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        Start Campaign
      </button>
      <button
        v-if="campaignActive && !paused"
        @click="$emit('next')"
        :disabled="isLastContact && currentIndex >= contacts.length - 1"
        class="px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#25D366] text-white hover:bg-[#1ebe5a] shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
        {{ isLastContact ? 'Finish' : 'Next' }}
      </button>
      <button
        v-if="campaignActive && !paused"
        @click="$emit('skip')"
        class="px-6 py-2.5 rounded-lg text-sm font-semibold bg-yellow-500 text-white hover:bg-yellow-600 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/></svg>
        Skip
      </button>
      <button
        v-if="campaignActive && !paused"
        @click="$emit('pause')"
        class="px-6 py-2.5 rounded-lg text-sm font-semibold bg-gray-600 text-white hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        Pause
      </button>
      <button
        v-if="paused && campaignActive"
        @click="$emit('resume')"
        class="px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#25D366] text-white hover:bg-[#1ebe5a] shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        Resume
      </button>
      <button
        @click="$emit('reset')"
        class="px-6 py-2.5 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
        Reset
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  canStart: { type: Boolean, default: false },
  campaignActive: { type: Boolean, default: false },
  paused: { type: Boolean, default: false },
  currentIndex: { type: Number, default: 0 },
  contacts: { type: Array, default: () => [] },
  isLastContact: { type: Boolean, default: false },
})
defineEmits(['start', 'next', 'skip', 'pause', 'resume', 'reset'])
</script>
