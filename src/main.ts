import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { HiSolidPencil, BiTrashFill, MdCancel } from "oh-vue-icons/icons";

addIcons(HiSolidPencil, BiTrashFill, MdCancel);

const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.mount("#app");