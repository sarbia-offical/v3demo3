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
export function registerVantUIComponent(app){
    app.component('van-button', Button)
    .component('van-swipe',Swipe)
    .component('van-swipe-item',SwipeItem)
    .component('van-popup', Popup)
    .component('van-navbar', NavBar)
}