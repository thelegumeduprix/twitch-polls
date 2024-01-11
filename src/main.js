import './style.css';
import { createApp } from 'vue';
import App from './components/App.vue';
import { setup } from './setup';

setup();

createApp(App).mount('#app');
