import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'login',
            component: resolve => require(['@/components/login'], resolve)
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['@/components/login'], resolve)
        },
        {
            path: '/home',
            name: 'home',
            component: resolve => require(['@/components/home'], resolve),
            children: [, {
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
                },
                {
                    path: '/links',
                    name: 'links',
                    component: resolve => require(['@/components/links'], resolve)
                },
                { path: '*', component: resolve => require(['@/components/NotFoundComponent'], resolve) }
            ]
        },

    ]
})