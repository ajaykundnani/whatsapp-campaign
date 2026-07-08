<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 py-6 sm:py-10">
      <header class="mb-8 text-center sm:text-left">
        <div class="flex items-center justify-center sm:justify-start gap-3 mb-2">
          <div class="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center shadow-sm">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
          </div>
          <div>
            <h1 class="text-xl sm:text-2xl font-bold text-gray-900">WhatsApp Draft Campaign</h1>
            <p class="text-xs sm:text-sm text-gray-500">Prepare and send WhatsApp messages manually</p>
          </div>
        </div>
      </header>

      <div class="space-y-5">
        <div v-if="!campaignActive" class="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div class="space-y-5">
            <PasteNumbers v-model="rawInput" />
            <div v-if="parseResult">
              <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div class="grid grid-cols-4 gap-3 text-center">
                  <div class="bg-blue-50 rounded-lg px-3 py-2.5">
                    <p class="text-lg font-bold text-blue-600">{{ parseResult.valid.length + parseResult.invalid.length + parseResult.duplicates }}</p>
                    <p class="text-xs text-gray-500">Total</p>
                  </div>
                  <div class="bg-green-50 rounded-lg px-3 py-2.5">
                    <p class="text-lg font-bold text-green-600">{{ parseResult.valid.length }}</p>
                    <p class="text-xs text-gray-500">Valid</p>
                  </div>
                  <div class="bg-red-50 rounded-lg px-3 py-2.5">
                    <p class="text-lg font-bold text-red-600">{{ parseResult.invalid.length }}</p>
                    <p class="text-xs text-gray-500">Invalid</p>
                  </div>
                  <div class="bg-orange-50 rounded-lg px-3 py-2.5">
                    <p class="text-lg font-bold text-orange-600">{{ parseResult.duplicates }}</p>
                    <p class="text-xs text-gray-500">Duplicates</p>
                  </div>
                </div>
              </div>
            </div>
            <ContactList
              :contacts="contacts"
              :completed="completed"
              :skipped="skipped"
              :currentIndex="currentIndex"
              :campaignActive="campaignActive"
              :paused="paused"
              :contactVariantMap="contactVariantMap"
              @show-message="showMessageModal"
            />
          </div>
          <div class="space-y-5">
            <MessageBox v-model="message" />
            <div v-if="contacts.length > 0 || message.length > 0">
              <CampaignControls
                :canStart="canStart"
                :campaignActive="campaignActive"
                :paused="paused"
                :currentIndex="currentIndex"
                :contacts="contacts"
                :isLastContact="isLastContact()"
                @start="handleStart"
                @next="handleNext"
                @skip="handleSkip"
                @pause="handlePause"
                @resume="handleResume"
                @reset="handleReset"
              />
            </div>
          </div>
        </div>

        <div v-if="campaignActive" class="space-y-5">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div class="lg:col-span-2 space-y-5">
              <ProgressCard
                :currentContact="currentContact"
                :total="totalContacts"
                :completed="completedCount"
                :skipped="skippedCount"
                :percent="progressPercent"
                :campaignActive="campaignActive"
              />
              <ContactList
                :contacts="contacts"
                :completed="completed"
                :skipped="skipped"
                :currentIndex="currentIndex"
                :campaignActive="campaignActive"
                :paused="paused"
                :contactVariantMap="contactVariantMap"
                @show-message="showMessageModal"
              />
            </div>
            <div class="space-y-5">
              <StatsCard
                :total="totalContacts"
                :completed="completedCount"
                :skipped="skippedCount"
                :remaining="remainingCount"
                :percent="progressPercent"
                :duplicateCount="duplicateCount"
              />
              <ExportButtons
                :completed="completed"
                :skipped="skipped"
              />
              <CampaignControls
                :canStart="canStart"
                :campaignActive="campaignActive"
                :paused="paused"
                :currentIndex="currentIndex"
                :contacts="contacts"
                :isLastContact="isLastContact()"
                @start="handleStart"
                @next="handleNext"
                @skip="handleSkip"
                @pause="handlePause"
                @resume="handleResume"
                @reset="handleReset"
              />
            </div>
          </div>
        </div>
      </div>

      <footer class="mt-10 text-center text-xs text-gray-400 border-t border-gray-100 pt-6">
        <p>This app only opens WhatsApp Web with pre-filled messages. You must manually click Send in WhatsApp.</p>
      </footer>
    </div>

    <ToastNotification
      :message="toast.message"
      :type="toast.type"
      :visible="toast.visible"
      @close="toast.visible = false"
    />

    <MessagePreviewModal
      :visible="modalState.visible"
      :phone="modalState.phone"
      :message="modalState.message"
      @close="closeMessageModal"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import PasteNumbers from './components/PasteNumbers.vue'
import ContactList from './components/ContactList.vue'
import MessageBox from './components/MessageBox.vue'
import CampaignControls from './components/CampaignControls.vue'
import ProgressCard from './components/ProgressCard.vue'
import StatsCard from './components/StatsCard.vue'
import ExportButtons from './components/ExportButtons.vue'
import ToastNotification from './components/ToastNotification.vue'
import MessagePreviewModal from './components/MessagePreviewModal.vue'
import { parsePhoneNumbers } from './utils/phoneParser.js'
import { useCampaign } from './composables/useCampaign.js'

const toast = ref({ message: '', type: 'success', visible: false })

function showToast(message, type = 'success') {
  toast.value = { message, type, visible: true }
}

const {
  contacts,
  message,
  currentIndex,
  completed,
  skipped,
  paused,
  campaignActive,
  rawInput,
  invalidNumbers,
  duplicateCount,
  totalContacts,
  currentContact,
  completedCount,
  skippedCount,
  remainingCount,
  progressPercent,
  canStart,
  startCampaign,
  nextContact,
  skipContact,
  pauseCampaign,
  resumeCampaign,
  resetCampaign,
  isLastContact,
  contactVariantMap,
  getVariantForContact,
} = useCampaign()

const modalState = ref({ visible: false, phone: '', message: '' })

function showMessageModal(phone) {
  const variant = getVariantForContact(phone)
  if (variant) {
    modalState.value = { visible: true, phone, message: variant }
  }
}

function closeMessageModal() {
  modalState.value.visible = false
}

const parseResult = computed(() => {
  if (!rawInput.value.trim()) return null
  return parsePhoneNumbers(rawInput.value)
})

watch(rawInput, (val) => {
  if (!val.trim()) {
    contacts.value = []
    invalidNumbers.value = []
    duplicateCount.value = 0
    return
  }
  const result = parsePhoneNumbers(val)
  contacts.value = result.valid
  invalidNumbers.value = result.invalid
  duplicateCount.value = result.duplicates
})

function handleStart() {
  if (!canStart.value) {
    if (contacts.value.length === 0) {
      showToast('Please paste at least one valid phone number', 'error')
    } else if (!message.value.trim()) {
      showToast('Please write a message', 'error')
    }
    return
  }
  const started = startCampaign()
  if (started) {
    showToast(`Campaign started! WhatsApp opened for ${contacts.value[0]}`)
  }
}

function handleNext() {
  if (currentIndex.value < contacts.value.length) {
    showToast(`Marked ${contacts.value[currentIndex.value]} as completed`)
  }
  nextContact()
}

function handleSkip() {
  if (currentIndex.value < contacts.value.length) {
    showToast(`Skipped ${contacts.value[currentIndex.value]}`, 'error')
  }
  skipContact()
}

function handlePause() {
  pauseCampaign()
  showToast('Campaign paused')
}

function handleResume() {
  resumeCampaign()
  showToast('Campaign resumed')
}

function handleReset() {
  resetCampaign()
  showToast('Campaign reset')
}
</script>
