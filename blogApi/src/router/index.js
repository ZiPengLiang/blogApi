import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'blogMain',
            component: resolve => require(['@/components/b_index'], resolve)
        },
        {
            path: '/blogMain',
            name: 'blogMain',
            component: resolve => require(['@/components/b_index'], resolve)
        },
        {
            path: '/addBlog',
            name: 'addBlog',
            component: resolve => require(['@/components/addBlog'], resolve)
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['@/components/login'], resolve)
        }
    ]
})