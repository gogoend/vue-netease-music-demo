export default {
    path: '/auth',
    name: 'Auth',
    redirect: '/auth/login',
    component: () => import('@/views/Auth/index.vue'),
    children: [
        {
            path: '/auth/login',
            name: 'Login',
            component: () => import('@/views/Auth/login.vue')
        },
        {
            path: '/auth/reg',
            name: 'Reg',
            component: () => import('@/views/Auth/reg.vue')
        }
    ]
}