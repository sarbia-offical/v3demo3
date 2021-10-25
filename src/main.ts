import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iconComponent from '@/components/icon/index.vue';
import dragDirective from "@/directive/drag";
// 引入组件
import { Button } from 'vant/es/button';
import 'vant/es/button/style';
import { Popup } from 'vant/es/popup'
import 'vant/es/popup/style';
// 引入全局样式
import "./assets/scss/index.scss";
// 引入axios请求类
import request from '@/utils/request';
let app = createApp(App);
// 注册自定义指令
dragDirective.registerDirective(app);
request.inital();
app.use(store).use(router);
app.component('iconComponent', iconComponent)
    .component('van-button', Button)
    .component('van-popup', Popup);
app.mount('#app')
