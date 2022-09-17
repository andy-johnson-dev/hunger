import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import vuetify from './plugins/vuetify'

import 'vuetify/styles'
import { loadFonts } from './plugins/webfontloader'
import { fakeBackend } from './utils/fake-backend'


loadFonts();
fakeBackend();

const app = createApp(App)

app.config.globalProperties.$verified = false
app.use(router)
app.use(createPinia())
app.use(vuetify)
app.mount('#app')




