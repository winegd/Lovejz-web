import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]

  },



]
export const asyncRoutes = [

  {
    path: '/class',
    component: Layout,
    // redirect: '/class',
    children: [{
      path: 'index',
      name: 'class',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '班级管理', icon: 'component', roles: ['2'] }
    }]

  },

  {
    path: '/que',
    component: Layout,
    // redirect: '/class',
    children: [{
      path: 'index',
      name: 'questions',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '题目管理', icon: 'tab', roles: ['1'] }
    }]

  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    meta: { title: '用户管理', icon: 'user_m' },
    children: [
      {
        path: 'tea',
        name: 'Tea',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '教师管理', roles: ['2'] },

      },
      {
        path: 'stu',
        name: 'Stu',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '学生管理', roles: ['1'] },
      }

    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
