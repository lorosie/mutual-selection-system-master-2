import Vue from 'vue'
import VueRouter from 'vue-router'
import {Message} from 'element-ui'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path:'/',
    redirect: '/login'
  },
  {
    path:'/home', 
    component:() => import ('../views/home.vue'),
    children:[
      { 
        path:'/welcome',
        component:() => import ('../views/welcome.vue'),
      },
      { 
        path:'/volluntaryFill',
        component:() => import ('../views/voluntary_fill.vue'),
      },
      { 
        path:'/chosenResult',
        component:() => import ('../views/chosen_result.vue'),
      },
      { 
        path:'/choosePostgraduate',
        component:() => import ('../views/choose_postgraduate.vue'),
      },
      { 
        path:'/checkResult',
        component:() => import ('../views/check_result.vue'),
      },
      { 
        path:'/importInformation',
        component:() => import ('../views/import_information.vue'),
      },
      { 
        path:'/activity',
        component:() => import ('../views/activity.vue'),
      },
      { 
        path:'/mySpace',
        component:() => import ('../views/my_space.vue'),
      },
    ]
  },
  {
    path:'/login',
    component:() => import ('../views/login.vue'),
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 设置路由导航
router.beforeEach((to, from, next) => {
  // 用户访问登录页，直接放行
	if(to.path === '/login') return next()
	// 从sessionStorage中获取到保存的token
	const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) {
    Message.info('未登录，请登录后访问')
    return next('/login')
  }else{
    // 如果有token 就跳转到下一个页面
	  next()
  }
})

export default router
