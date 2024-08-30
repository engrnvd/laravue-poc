import U from 'nvd-u/index'
import 'nvd-u/u-core.scss'
import { createPinia } from 'pinia'
import 'src/styles/app.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routes'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(U)

app.mount('#app')
