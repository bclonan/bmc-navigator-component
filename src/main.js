import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ECFRNavigatorPlugin from './index'
import './index.css'

// Create the app
const app = createApp(App)

// Use Pinia for state management
app.use(createPinia())

// Use the ECFR Navigator plugin
app.use(ECFRNavigatorPlugin)

// Mount the app
app.mount('#app')