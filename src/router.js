import Vue from 'vue';
//导入路由的包
import Router from 'vue-router';
//安装路由
Vue.use(Router);

//导入对应的路由组件
import Home from './components/home.vue';
import Book from './components/book.vue';
import Detail from './components/detail.vue';
import Cart from './components/cart.vue';
import Mine from './components/mine.vue';

//创建路由对象
export default new Router({
  routes: [//配置路由规则
  	{ path: '/', redirect: {name:'home'}},
    { name:'home', path: '/home', component: Home },
    { name:'book', path: '/book', component: Book },
    { name:'detail', path: '/detail', component: Detail },
    { name:'cart', path: '/cart', component: Cart },
    { name:'mine', path: '/mine', component: Mine },
  ],
  linkActiveClass: 'mui-active'//覆盖默认路由高亮类router-link-active
})