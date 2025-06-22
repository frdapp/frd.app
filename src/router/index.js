import {  createWebHashHistory, createRouter } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration

import { useUserStore } from '@/store/modules/user'

const routes = [

    {
        path: '/',
        component: () => import('@/views/blog/index.vue'),
    },
    {
        path: '/view',
        component: () => import('@/views/blog/view.vue'),
    },
    {
        path: '/404',
        component: () => import('@/views/404.vue'),
    },
    { 
        path: '/*', 
        redirect: '/404', 
    },
]

const router = createRouter({
  //history: createMemoryHistory(), //这样会无法识别路径的，总是  /
  history: createWebHashHistory(),
  routes:routes,
})

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

    const userStore = useUserStore()
    const token=userStore.user.token;

    if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next()
    } 
    else 
    {
        if (token) 
        {
            // other pages that do not have permission to access are redirected to the login page.
            next();
        }
        else
        {
            next();
            //next(`/login?redirect=${to.path}`)
        }

    }

    NProgress.done()

})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})


export default router
