import { ref, computed, watch } from 'vue'
import { loadState, saveState, clearState } from '../utils/storage.js'
import { generateMessageVariants } from '../utils/messageVariants.js'

export function useCampaign() {
  const contacts = ref([])
  const message = ref(`Hi 👋

Are you someone who loves travelling and exploring new places? 🌍✈️

I'd love to introduce you to **NearLio** – a free travel companion designed to make every trip easier and more enjoyable.

With NearLio, you can instantly check:
🌦️ Live Weather
🚦 Traffic Conditions
📍 Distance & Travel Time
⛽ Petrol & Diesel Prices
⭐ Google Reviews & Ratings
🍽️ Restaurants & Cafes
🏨 Hotels & Accommodations
🏥 Hospitals, ATMs, Petrol Pumps & many more essential services

Whether you're planning a weekend getaway, road trip, or vacation, NearLio helps you get all the important travel information in one place.

🌐 Try it here: https://ajaykundnani.github.io/place-compare/

Your feedback and suggestions would mean a lot to us and will help us improve NearLio for all travellers. 😊

Thank you, and happy travelling`) 
  const currentIndex = ref(0)
  const completed = ref([])
  const skipped = ref([])
  const paused = ref(false)
  const campaignActive = ref(false)
  const rawInput = ref('')
  const invalidNumbers = ref([])
  const duplicateCount = ref(0)
  const messageVariants = ref([])
  const contactVariantMap = ref({})

  const saved = loadState()
  if (saved) {
    contacts.value = saved.contacts || []
    message.value = saved.message || message.value
    currentIndex.value = saved.currentIndex || 0
    completed.value = saved.completed || []
    skipped.value = saved.skipped || []
    paused.value = true
    campaignActive.value = saved.campaignActive ?? false
    rawInput.value = saved.rawInput || ''
    invalidNumbers.value = saved.invalidNumbers || []
    duplicateCount.value = saved.duplicateCount || 0
    messageVariants.value = saved.messageVariants || []
    contactVariantMap.value = saved.contactVariantMap || {}
  }

  const persist = () => {
    saveState({
      contacts: contacts.value,
      message: message.value,
      currentIndex: currentIndex.value,
      completed: completed.value,
      skipped: skipped.value,
      paused: paused.value,
      campaignActive: campaignActive.value,
      rawInput: rawInput.value,
      invalidNumbers: invalidNumbers.value,
      duplicateCount: duplicateCount.value,
      messageVariants: messageVariants.value,
      contactVariantMap: contactVariantMap.value,
    })
  }

  watch([contacts, message, currentIndex, completed, skipped, paused, campaignActive, rawInput, invalidNumbers, duplicateCount, messageVariants, contactVariantMap], persist, { deep: true })

  const totalContacts = computed(() => contacts.value.length)
  const currentContact = computed(() => contacts.value[currentIndex.value] || null)
  const completedCount = computed(() => completed.value.length)
  const skippedCount = computed(() => skipped.value.length)
  const remainingCount = computed(() => totalContacts.value - currentIndex.value - completedCount.value - skippedCount.value)
  const progressPercent = computed(() => {
    if (totalContacts.value === 0) return 0
    return Math.round(((completedCount.value + skippedCount.value) / totalContacts.value) * 100)
  })

  const canStart = computed(() => contacts.value.length > 0 && message.value.trim().length > 0 && !campaignActive.value)

  function openWhatsApp(phone) {
    const text = contactVariantMap.value[phone] || message.value
    const encoded = encodeURIComponent(text)
    const url = `https://web.whatsapp.com/send?phone=${phone}&text=${encoded}`
    window.open(url, '_blank')
  }

  function startCampaign() {
    if (!canStart.value) return false
    const variants = generateMessageVariants(20)
    const map = {}
    contacts.value.forEach((phone, i) => {
      map[phone] = variants[i % variants.length]
    })
    messageVariants.value = variants
    contactVariantMap.value = map
    campaignActive.value = true
    paused.value = false
    currentIndex.value = 0
    completed.value = []
    skipped.value = []
    openWhatsApp(contacts.value[0])
    return true
  }

  function clearVariants() {
    messageVariants.value = []
    contactVariantMap.value = {}
  }

  function nextContact() {
    if (currentIndex.value < totalContacts.value) {
      completed.value.push(contacts.value[currentIndex.value])
      currentIndex.value++
    }
    if (currentIndex.value < totalContacts.value) {
      openWhatsApp(contacts.value[currentIndex.value])
    } else {
      campaignActive.value = false
      paused.value = true
      clearVariants()
    }
  }

  function skipContact() {
    if (currentIndex.value < totalContacts.value) {
      skipped.value.push(contacts.value[currentIndex.value])
      currentIndex.value++
    }
    if (currentIndex.value < totalContacts.value) {
      openWhatsApp(contacts.value[currentIndex.value])
    } else {
      campaignActive.value = false
      paused.value = true
      clearVariants()
    }
  }

  function pauseCampaign() {
    paused.value = true
  }

  function resumeCampaign() {
    if (campaignActive.value && paused.value && currentIndex.value < totalContacts.value) {
      paused.value = false
      openWhatsApp(contacts.value[currentIndex.value])
    }
  }

  function resetCampaign() {
    contacts.value = []
    message.value = ''
    currentIndex.value = 0
    completed.value = []
    skipped.value = []
    paused.value = false
    campaignActive.value = false
    rawInput.value = ''
    invalidNumbers.value = []
    duplicateCount.value = 0
    clearVariants()
    clearState()
  }

  function isLastContact() {
    return currentIndex.value >= totalContacts.value - 1
  }

  function getVariantForContact(phone) {
    return contactVariantMap.value[phone] || null
  }

  return {
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
    openWhatsApp,
    messageVariants,
    contactVariantMap,
    getVariantForContact,
  }
}
