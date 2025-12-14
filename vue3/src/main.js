import { createApp } from 'vue'
import { createPinia } from 'pinia'
import components from '@/components/UI'
import App from '@/App.vue'
import router from '@/router'
import store from '@/stores'
import './index.css';

const app = createApp(App)

components.forEach((component) => app.component(component.name, component))
app.use(store)

app.use(createPinia())
app.use(router)

app.mount('#app')
