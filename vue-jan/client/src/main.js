import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index";
import store from './store'
import Vue from 'vue'
import axios from "axios";
import VueAxios from "vue-axios";


//  Ak mam token, pouzijem token
const app = createApp(App).use(router).use(store)
// Setting up default vue's http modules for api calls
// app.prototype.$http = axios;
app.config.globalProperties.$http=axios
// Load the token from the localStorage
const token = localStorage.getItem("token");
// Is there is any token then we will simply append default axios authorization headers
if (token) {
    app.prototype.$http.defaults.headers.common['Authorization'] = token;
}

app.mount('#app')
