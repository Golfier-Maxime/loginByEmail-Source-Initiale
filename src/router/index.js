import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'email', component: () => import('../pages/emailLogin.vue') },
        { path: '/tierce', name: 'tierce', component: () => import('../pages/SignByGoogle.vue') },
    ]
})

export default router