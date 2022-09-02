import { createRouter, createWebHistory} from 'vue-router'

import LoginPage from './pages/LoginPage'
import SignInPage from './pages/SignInPage'
import MainPage from './pages/MainPage'
import AdminPage from './pages/AdminPage'
import DetailsPage from './pages/DetailsPage'
import CartPage from './pages/CartPage'

const routes = [
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

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router