import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import store from './store'
import { gl_ajax } from './common/server.js'
Vue.use(mavonEditor);
Vue.use(ElementUI);

Vue.prototype.axios = axios;
Vue.prototype.gl_ajax = gl_ajax;
axios.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if (to.path == '/login' || to.path == '/') {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('token');
        next()
    } else {

        next()
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})