import {  createWebHistory, createRouter } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration

import { useUserStore } from '@/store/modules/user'

const routes = [

    {
        path: '/',
        component: () => import('@/layout/frontend/index.vue'),
        children:[
            {
                path: '',
                component: () => import('@/views/user/index/index.vue'),
            },

            {
                path: 'login',
                component: () => import('@/views/user/login/login.vue'),
            },
            {
                path: 'register',
                component: () => import('@/views/user/login/register.vue'),
            },
            {
                path: 'forgot_password',
                component: () => import('@/views/user/login/forgot_password.vue'),
            },
            {
                path: 'login-manage',
                component: () => import('@/views/manage/login/login.vue'),
            },
            {
                path: 'verify',
                component: () => import('@/views/user/login/verify.vue'),
            },
            {
                path: 'checkout',
                component: () => import('@/views/user/index/checkout.vue'),
            },
        ]
    },
    {
        path: '/admin',
        component: () => import('@/layout/admin/index.vue'),
        children:[
            {
                path: 'dashboard',
                component: () => import('@/views/admin/dashboard/index.vue'),
            },
            {
                path: 'profile',
                component: () => import('@/views/admin/profile/index.vue'),
            },
            {
                path: 'admin',
                component: () => import('@/views/admin/admin/index.vue'),
            },
            {
                path: 'domain',
                component: () => import('@/views/admin/domain/index.vue'),
            },
            {
                path: 'domain/create',
                component: () => import('@/views/admin/domain/form.vue'),
            },
            {
                path: 'domain/update',
                component: () => import('@/views/admin/domain/form.vue'),
            },
            {
                path: 'domain/view_setting',
                component: () => import('@/views/admin/domain/view_setting.vue'),
            },

            {
                path: 'alias_domain',
                component: () => import('@/views/admin/alias_domain/index.vue'),
            },
            {
                path: 'alias_domain/create',
                component: () => import('@/views/admin/alias_domain/form.vue'),
            },
            {
                path: 'alias_domain/update',
                component: () => import('@/views/admin/alias_domain/form.vue'),
            },

            {
                path: 'alias',
                component: () => import('@/views/admin/alias/index.vue'),
            },
            {
                path: 'alias/create',
                component: () => import('@/views/admin/alias/form.vue'),
            },
            {
                path: 'alias/update',
                component: () => import('@/views/admin/alias/form.vue'),
            },

            {
                path: 'email',
                component: () => import('@/views/admin/email/index.vue'),
            },
            {
                path: 'email/create',
                component: () => import('@/views/admin/email/form.vue'),
            },
            {
                path: 'email/update',
                component: () => import('@/views/admin/email/form.vue'),
            },

            {
                path: 'storage',
                component: () => import('@/views/admin/storage/index.vue'),
            },
            {
                path: 'storage/buy',
                component: () => import('@/views/admin/storage/buy.vue'),
            },

            {
                path: 'order',
                component: () => import('@/views/admin/order/index.vue'),
            },
            {
                path: 'order/view',
                component: () => import('@/views/admin/order/view.vue'),
            },
              {
                path: 'ticket',
                component: () => import('@/views/admin/ticket/index.vue'),
            },
            {
                path: 'ticket/view',
                component: () => import('@/views/admin/ticket/view.vue'),
            },
            {
                path: 'ticket/create',
                component: () => import('@/views/admin/ticket/form.vue'),
            },
            {
                path: 'ticket/update',
                component: () => import('@/views/admin/ticket/form.vue'),
            },

            {
                path: 'log',
                component: () => import('@/views/admin/log/index.vue'),
            },
            {
                path: 'log/view',
                component: () => import('@/views/admin/log/view.vue'),
            },
	],
    },
    {
        path: '/manage',
        component: () => import('@/layout/manage/index.vue'),
        children:[
            {
                path: 'dashboard',
                component: () => import('@/views/manage/dashboard/index.vue'),
            },
            {
                path: 'profile',
                component: () => import('@/views/manage/profile/index.vue'),
            },
            {
                path: 'admin',
                component: () => import('@/views/manage/admin/index.vue'),
            },
            {
                path: 'admin/create',
                component: () => import('@/views/manage/admin/form.vue'),
            },
            {
                path: 'admin/update',
                component: () => import('@/views/manage/admin/form.vue'),
            },

            {
                path: 'product',
                component: () => import('@/views/manage/product/index.vue'),
            },
            {
                path: 'product/create',
                component: () => import('@/views/manage/product/form.vue'),
            },
            {
                path: 'product/update',
                component: () => import('@/views/manage/product/form.vue'),
            },

            {
                path: 'activity',
                component: () => import('@/views/manage/activity/index.vue'),
            },
            {
                path: 'activity/create',
                component: () => import('@/views/manage/activity/form.vue'),
            },
            {
                path: 'activity/update',
                component: () => import('@/views/manage/activity/form.vue'),
            },
            {
                path: 'user',
                component: () => import('@/views/manage/user/index.vue'),
            },
            {
                path: 'user/create',
                component: () => import('@/views/manage/user/form.vue'),
            },
            {
                path: 'user/update',
                component: () => import('@/views/manage/user/form.vue'),
            },

            {
                path: 'domain',
                component: () => import('@/views/manage/domain/index.vue'),
            },
            {
                path: 'domain/create',
                component: () => import('@/views/manage/domain/form.vue'),
            },
            {
                path: 'domain/update',
                component: () => import('@/views/manage/domain/form.vue'),
            },

            {
                path: 'email',
                component: () => import('@/views/manage/email/index.vue'),
            },
            {
                path: 'email/create',
                component: () => import('@/views/manage/email/form.vue'),
            },
            {
                path: 'email/update',
                component: () => import('@/views/manage/email/form.vue'),
            },

            {
                path: 'alias_domain',
                component: () => import('@/views/manage/alias_domain/index.vue'),
            },
            {
                path: 'alias_domain/create',
                component: () => import('@/views/manage/alias_domain/form.vue'),
            },
            {
                path: 'alias_domain/update',
                component: () => import('@/views/manage/alias_domain/form.vue'),
            },

            {
                path: 'alias',
                component: () => import('@/views/manage/alias/index.vue'),
            },
            {
                path: 'alias/create',
                component: () => import('@/views/manage/alias/form.vue'),
            },
            {
                path: 'alias/update',
                component: () => import('@/views/manage/alias/form.vue'),
            },


            {
                path: 'storage',
                component: () => import('@/views/manage/storage/index.vue'),
            },
            {
                path: 'storage/create',
                component: () => import('@/views/manage/storage/form.vue'),
            },
            {
                path: 'storage/update',
                component: () => import('@/views/manage/storage/form.vue'),
            },

            {
                path: 'ticket',
                component: () => import('@/views/manage/ticket/index.vue'),
            },
            {
                path: 'ticket/view',
                component: () => import('@/views/manage/ticket/view.vue'),
            },

            {
                path: 'order',
                component: () => import('@/views/manage/order/index.vue'),
            },
            {
                path: 'order/view',
                component: () => import('@/views/manage/order/view.vue'),
            },
  
            {
                path: 'storage/create',
                component: () => import('@/views/manage/ticket/form.vue'),
            },
            {
                path: 'storage/update',
                component: () => import('@/views/manage/ticket/form.vue'),
            },

            {
                path: 'log',
                component: () => import('@/views/manage/log/index.vue'),
            },
            {
                path: 'log/view',
                component: () => import('@/views/manage/log/view.vue'),
            },

            {
                path: 'email_template',
                component: () => import('@/views/manage/email_template/index.vue'),
            },
            {
                path: 'email_template/create',
                component: () => import('@/views/manage/email_template/form.vue'),
            },
            {
                path: 'email_template/update',
                component: () => import('@/views/manage/email_template/form.vue'),
            },
            {
                path: 'email_send_log',
                component: () => import('@/views/manage/email_send_log/index.vue'),
            },

            {
                path: 'guest_message',
                component: () => import('@/views/manage/guest_message/index.vue'),
            },
	],
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
  history: createWebHistory(),
  routes:routes,
})

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

    const userStore = useUserStore()
    const token=userStore.user.token;

    /*
    if(to.path.startsWith("/admin"))
    {
        const is_verified=userStore.user.token;
    }
    */

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
