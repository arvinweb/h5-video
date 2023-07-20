import type { RouteRecordRaw } from 'vue-router'

const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: () => import('~/pages/home/homeIndex.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('~/pages/login/LioginIndex.vue'),
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('~/pages/login/RegisterIndex.vue'),
    meta: {
      title: '注册'
    }
  },
  // 视频区
  {
    path: '/video',
    name: 'video',
    component: () => import('~/pages/video/VideoIndex.vue'),
    meta: {
      title: '视频',
      keepAlive: true
    }
  },
  {
    path: '/more',
    name: 'more',
    component: () => import('~/pages/video/MoreIndex.vue'),
    meta: {
      title: '视频更多',
      keepAlive: true
    }
  },
  {
    path: '/videoDetails',
    name: 'videoDetails',
    component: () => import('~/pages/video/VideoDetails.vue'),
    meta: {
      title: '视频详情',
      keepAlive: false
    }
  },

  // 社区
  {
    path: '/dynamic',
    name: 'dynamic',
    component: () => import('~/pages/dynamic/DynamicIndex.vue'),
    meta: {
      title: '社区首页',
      keepAlive: true
    }
  },
  {
    path: '/dynamicDetails',
    name: 'dynamicDetails',
    component: () => import('~/pages/dynamic/DynamicDetails.vue'),
    meta: {
      title: '社区详情',
      keepAlive: true
    }
  },
  {
    path: '/release',
    name: 'release',
    component: () => import('~/pages/dynamic/DynamicRelease.vue'),
    meta: {
      title: '社区发布',
      keepAlive: true
    }
  },
  // 个人中心
  {
    path: '/mine',
    name: 'mine',
    component: () => import('~/pages/my/myIndex.vue'),
    meta: {
      title: '个人中心',
      keepAlive: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('~/pages/404.vue')
  }
]

export default staticRoutes
