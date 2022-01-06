/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-11-15 10:37:05
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-06 14:56:21
 */
import 'vant/es/button/style';
import { Button } from "vant/es/button";
import 'vant/es/popup/style';
import { Popup } from "vant/es/popup";
import 'vant/es/swipe/style';
import { Swipe } from 'vant/es/swipe';
import 'vant/es/swipe-item/style';
import { SwipeItem } from 'vant/es/swipe-item';
import 'vant/es/nav-bar/style';
import { NavBar } from 'vant/es/nav-bar';
import 'vant/es/dialog/style';
import { Toast } from 'vant';
import 'vant/es/toast/style';
export function registerVantUIComponent(app){
    app.component('van-button', Button)
    .component('van-swipe',Swipe)
    .component('van-swipe-item',SwipeItem)
    .component('van-popup', Popup)
    .component('van-navbar', NavBar);
    app.use(Toast);
}