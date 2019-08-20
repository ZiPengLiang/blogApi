import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

let store = new vuex.Store({
    state: {
        notLogin: true
    },
    mutations: {
        changeLoginStatus(state, status) {
            state.notLogin = status
        }
    }
})

export default store;