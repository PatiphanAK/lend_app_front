import './styles.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'; // นำเข้า store ของคุณ
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const store = useAuthStore();

const accessToken = localStorage.getItem('accessToken');
if (accessToken) {
    store.loginWithToken(accessToken);
}

app.mount('#app')
