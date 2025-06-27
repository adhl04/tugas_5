// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia'; // Impor createPinia

const app = createApp(App);
const pinia = createPinia(); // Buat instance Pinia

app.use(pinia); // Gunakan Pinia
app.mount('#app');