import { createApp } from 'vue';
import './style.css';
import App from './newApp.vue';
import DragSection from '../lib/index.js';
const app = createApp(App);
app.use(DragSection);
app.mount('#app');
