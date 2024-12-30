import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


import Layout from '@/layout'
import RouterView from '@/layout/router-view'
/**
 * constantRoutes
 */
export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'edit',
    children: [
      {
        path: 'edit',
        component: () => import('@/views/edit'),
        name: 'edit',
        meta: { title: '编辑' }
      },
      /* {
        path: 'test',
        component: () => import('@/views/test'),
        name: 'test',
        meta: { title: '测试' }
      }, */
      {
        path: 'dataConfig',
        component: () => import('@/views/dataConfig'),
        name: 'dataConfig',
        meta: { title: '数据' }
      },
    ]
  },
  {
    path: '/preview',
    component: () => import('@/views/preview'),
    name: 'preview',
    meta: { title: '预览' }
  }
]



/**
 * errorRoutes
 * 404
 */
export const errorRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const routes = constantRoutes.concat(errorRoutes)

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})

const router = createRouter()


export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
