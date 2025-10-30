import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import Home from '@/pages/Home.vue'
import Login from '@/pages/auth/Login.vue'
import Signup from '@/pages/auth/Signup.vue'
import Tickets from '@/pages/Tickets.vue'
import Dashboard from '@/pages/Dashboard.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: MainLayout,
            children: [
                {
                    path: '',
                    name: 'Home',
                    component: Home
                },
                {
                    path: 'auth/login',
                    name: 'Login',
                    component: Login
                }
                ,
                {
                    path: 'auth/signup',
                    name: 'Signup',
                    component: Signup
                }
            ]
        },
        {
            path: '/tickets',
            name: 'Tickets',
            component: Tickets,
            meta: { requiresAuth: true } // 👈 Protect this route
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: { requiresAuth: true } // 👈 Protect this route too
        }
    ]
})

// ✅ Global navigation guard
router.beforeEach((to, from, next) => {
    const userSession = localStorage.getItem('ticketapp_session')

    // If route requires auth and no token/session, redirect to login
    if (to.meta.requiresAuth && !userSession) {
        next({ name: 'Login' })
    }
    // If user is logged in and tries to go to login again, redirect to dashboard
    else if (to.name === 'Login' && userSession) {
        next({ name: 'Dashboard' })
    }
    else {
        next()
    }
})

export default router
