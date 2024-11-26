import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { HiSolidPencil, BiTrashFill, MdCancel } from "oh-vue-icons/icons";

addIcons(HiSolidPencil, BiTrashFill, MdCancel);

const app = createApp(App);
const pinia = createPinia()
app.component("v-icon", OhVueIcon);
app.use(pinia)
app.mount("#app");