import { createApp } from 'vue'
//import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import store from './stores'
import vuetify from './plugins/vuetify'

import 'vuetify/styles'
import { loadFonts } from './plugins/webfontloader'
//import { fakeBackend } from './utils/fake-backend'


loadFonts();
//fakeBackend();

const app = createApp(App)

// app.config.globalProperties.$verified = false
//app.use(createPinia())
app.use(store)
app.use(router)
app.use(vuetify)
app.mount('#app')




