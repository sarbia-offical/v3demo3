/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-11-15 10:37:05
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-13 11:44:31
 */
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
// 加入缓存工具类
import storage from '@/utils/storage';
let app = createApp(App);
// 注册自定义指令
dragDirective.registerDirective(app);
request.inital();
storage.initial();
app.use(store).use(router);
app.component('iconComponent', iconComponent);
app.directive('loading', loadingComponent);
app.directive('waiting', waitingComponent);
app.use(lazyPlugin, {
    loading: require('@/assets/img/img.png')
})
registerVantUIComponent(app);
console.log(app);
app.mount('#app')
