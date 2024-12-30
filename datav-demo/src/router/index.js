import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import RouterView from '@/layout/router-view'


/**
 * asyncRoutes
 */
export const asyncRoutesL = [
  /* {
    path: '/page1',
    component: () => import('@/views/page1'),
    name: 'page1',
    meta: { title: 'page1' }
  },
  {
    path: '/page2',
    redirect: '/page2/page21',
    component: RouterView,
    name: 'page2',
    meta: { title: 'page2' },
    children: [
      {
        path: 'page21',
        component: () => import('@/views/page2/page21'),
        name: 'page21',
        meta: { title: 'page21' }
      },
      {
        path: 'page22',
        component: () => import('@/views/page2/page22'),
        name: 'page22',
        meta: { title: 'page22' }
      },
    ]
  },
   */
  {
    path: '/page3',
    component: () => import('@/views/page3'),
    name: 'page3',
    meta: { title: '1' }
  },
  {
    path: '/page4',
    component: () => import('@/views/page4'),
    name: 'page4',
    meta: { title: '2' }
  }
]
export const asyncRoutesR = [
  {
    path: '/page5',
    component: () => import('@/views/page5'),
    name: 'page5',
    meta: { title: '3' }
  },
  {
    path: '/page6',
    component: () => import('@/views/page6'),
    name: 'page6',
    meta: { title: '4' }
  }
]
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
    path: '/',
    component: Layout,
    redirect: '/page3',
    children: asyncRoutesL.concat(asyncRoutesR)
  },
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
console.log('routes', routes)

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
