import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginPage from './pages/LoginPage'
import SignInPage from './pages/SignInPage'
import MainPage from './pages/MainPage'
import AdminPage from './pages/AdminPage'
import DetailsPage from './pages/DetailsPage'
import CartPage from './pages/CartPage'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes:[
        {
            path: "/",
            redirect: "/login",
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/signIn',
            name: 'signIn',
            component: SignInPage
        },
        {
            path: '/main',
            name: 'main',
            component: MainPage
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminPage
        },
        {
            path: '/details',
            name: 'details',
            component: DetailsPage,
            props: true
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartPage
        }
    ]
})