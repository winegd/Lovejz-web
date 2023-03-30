import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
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
      path: 'class',
      name: 'class',
      component: () => import('@/views/class/index'),
      meta: { title: '班级管理', icon: 'component', roles: ['2'] }
    }]

  },
  {
    path: '/chapter',
    component: Layout,
    children: [{
      path: 'index',
      name: 'chapter',
      component: () => import('@/views/chapter/index'),
      meta: { title: '章节管理', icon: 'component', roles: ['1'] }
    }]

  },
  {
    path: '/que',
    component: Layout,
    meta: {roles: ['1']},
    children: [{
      path: 'questions',
      name: 'questions',
      component: () => import('@/views/question/index'),
      meta: { title: '题目管理', icon: 'tab' }
    },
    {
      path: 'addquestion',
      name:'addquestion',
      component: () => import('@/views/addquestion'),
      hidden: true
    },


    ]

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
        component: () => import('@/views/teacher/index'),
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
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
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
