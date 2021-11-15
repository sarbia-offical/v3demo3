import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iconComponent from '@/components/icon/index.vue';
import dragDirective from "@/directive/drag";
// 引入vantui组件
import { registerVantUIComponent } from '@/vant';
// 引入全局样式
import "./assets/scss/index.scss";
// 引入axios请求类
import request from '@/utils/request';
// 引入loading自定义指令
import loadingComponent from '@/directive/loading';
// 加入waiting自定义指令
import waitingComponent from '@/directive/waiting';
// 加入图片懒加载
import lazyPlugin from "vue3-lazy";
let app = createApp(App);
// 注册自定义指令
dragDirective.registerDirective(app);
request.inital();
app.use(store).use(router);
app.component('iconComponent', iconComponent);
app.directive('loading', loadingComponent);
app.directive('waiting', waitingComponent);
app.use(lazyPlugin, {
    loading: require('@/assets/img/img.png')
})
registerVantUIComponent(app);
app.mount('#app')
