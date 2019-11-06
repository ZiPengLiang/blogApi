// import Vue from 'vue'
import vuex from 'vuex'
// const vuex = require('vuex')
Vue.use(vuex);

let store = new vuex.Store({
    state: {
        loginFlag: true
    },
    mutations: {
        setloginflag_state(state, flag) {
            state.loginFlag = flag;
        },
    }
})

export default store;