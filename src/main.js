// 入口文件
import Vue from 'vue';
//导入app根组件
import app from './App.vue';
//导入自己的router.js路由模块
import router from './router.js';
//导入自己的store.js路由模块
import store from './store.js';
//引入全局组件要用的子组件
import NavHeader from './components/common/navHeader.vue';
Vue.component('navHeader', NavHeader);
//引入全局样式
import './static/css/global.css';
//导入MUI样式
import './static/css/mui.css';
import './static/css/mui.min.css';
import 'mint-ui/lib/style.css';
//导入mint-ui的组件
import { Header, Swipe, SwipeItem, Button, Loadmore, Lazyload } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(Loadmore.name, Loadmore);
Vue.use(Lazyload);

new Vue({
  el: '#app',
  render: c => c(app),
  router,
  store
})