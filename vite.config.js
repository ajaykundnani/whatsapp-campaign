import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
base:'/whatsapp-campaign/',
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons.svg'],
      manifest: {
        name: 'WhatsApp Campaign Manager',
        short_name: 'WA Campaign',
        description: 'Prepare, manage and send WhatsApp messages with drafts and message variants.',
        theme_color: '#25D366',
        background_color: '#f9fafb',
        display: 'standalone',
        display_override: ['window-controls-overlay', 'standalone'],
        scope: '/whatsapp-campaign/',
        start_url: '/whatsapp-campaign/',
        orientation: 'portrait',
        categories: ['communication', 'social', 'productivity'],
        lang: 'en',
        dir: 'ltr',
        prefer_related_applications: false,
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,json}'],
        navigateFallback: '/',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/web\.whatsapp\.com\/.*/i,
            handler: 'NetworkOnly',
          },
        ],
      },
    }),
  ],
})
