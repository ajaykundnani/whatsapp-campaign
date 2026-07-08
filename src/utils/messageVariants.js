const greetings = [
  'Hi 👋',
  'Hello! 👋',
  'Hey there! 👋',
  'Greetings! 🌟',
  'Hi there! 👋',
]

const openings = [
  'Are you someone who loves travelling and exploring new places? 🌍✈️',
  'Do you enjoy travelling and discovering new destinations? 🗺️✨',
  'Are you passionate about exploring new places? 🌎🎒',
  'Love to travel and explore the world? 🏔️🌴',
]

const intros = [
  "I'd love to introduce you to **NearLio** – a free travel companion designed to make every trip easier and more enjoyable.",
  "Let me tell you about **NearLio** – a handy travel companion that makes every journey simpler and more fun.",
  "I'd like to share **NearLio** with you – a free travel tool that helps make every trip smooth and enjoyable.",
  "Have you heard of **NearLio**? It's a free travel companion built to make your trips easier and more enjoyable.",
]

const featureSets = [
  `With NearLio, you can instantly check:
🌦️ Live Weather
🚦 Traffic Conditions
📍 Distance & Travel Time
⛽ Petrol & Diesel Prices
⭐ Google Reviews & Ratings
🍽️ Restaurants & Cafes
🏨 Hotels & Accommodations
🏥 Hospitals, ATMs, Petrol Pumps & many more essential services`,
  `NearLio gives you instant access to:
🌦️ Live Weather updates
🚦 Real-time Traffic Conditions
📍 Distance & Travel Time
⛽ Current Petrol & Diesel Prices
⭐ Google Reviews & Ratings
🍽️ Nearby Restaurants & Cafes
🏨 Hotels & Accommodations
🏥 Hospitals, ATMs, Petrol Pumps and more`,
  `With NearLio, you get all this instantly:
🌦️ Live Weather
🚦 Traffic Conditions
📍 Distance & Travel Time
⛽ Petrol & Diesel Prices
⭐ Google Reviews & Ratings
🍽️ Restaurants & Cafes
🏨 Hotels & Accommodations
🏥 Hospitals, ATMs, Petrol Pumps`,
  `Check all of these on NearLio:
🌦️ Live Weather
🚦 Traffic Conditions
📍 Distance & Travel Time
⛽ Petrol & Diesel Prices
⭐ Google Reviews & Ratings
🍽️ Restaurants & Cafes
🏨 Hotels & Accommodations
🏥 Hospitals, ATMs, Petrol Pumps & more`,
]

const closings = [
  `Whether you're planning a weekend getaway, road trip, or vacation, NearLio helps you get all the important travel information in one place.

🌐 Try it here: https://ajaykundnani.github.io/place-compare/

Your feedback and suggestions would mean a lot to us and will help us improve NearLio for all travellers. 😊

Thank you, and happy travelling!`,
  `Whether it's a weekend trip, road trip, or holiday, NearLio brings all the travel info you need right to your fingertips.

🌐 Check it out: https://ajaykundnani.github.io/place-compare/

We'd love to hear your feedback and suggestions to make NearLio even better. 😊

Safe travels! 🌟`,
  `Planning a weekend getaway, road trip, or vacation? NearLio has all the travel information you need in one place.

🌐 Visit us: https://ajaykundnani.github.io/place-compare/

Your thoughts and suggestions are valuable to us and will help us improve NearLio for everyone. 😊

Happy travels! 🚀`,
  `For weekend getaways, road trips, or vacations – NearLio gives you all the essential travel information at your fingertips.

🌐 Explore here: https://ajaykundnani.github.io/place-compare/

We really appreciate your feedback to help us make NearLio better for all travellers. 😊

Wishing you wonderful journeys ahead! 🌍`,
]

export function generateMessageVariants(count = 20) {
  const variants = []
  for (let i = 0; i < count; i++) {
    const g = greetings[i % greetings.length]
    const o = openings[i % openings.length]
    const intro = intros[i % intros.length]
    const f = featureSets[i % featureSets.length]
    const c = closings[i % closings.length]
    variants.push(`${g}\n\n${o}\n\n${intro}\n\n${f}\n\n${c}`)
  }
  return variants
}
