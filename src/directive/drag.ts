/*
 * @Description: 
 * @version: 
 * @Author: zouWenQin
 * @Date: 2021-08-18 14:41:51
 * @LastEditors: zouWenQin
 * @LastEditTime: 2021-08-18 21:01:53
 */
let x = 0;
let y = 0;
let flag = false;
export default {
    registerDirective(app: any){
        app.directive('drag',{
            mounted(el: HTMLElement,context: any){
                const { value: { elementClass: className } } = context;
                const element = document.querySelector(className);
                el.addEventListener('mousedown',(event: MouseEvent) => {
                    x = event.pageX - element.offsetLeft;
                    y = event.pageY - element.offsetTop;
                    flag = true;
                })

                el.addEventListener('mousemove', (event: MouseEvent) => {
                    if(flag){
                        element.style.left = (event.pageX - x) + 'px';
                        element.style.top = (event.pageY - y) + 'px'
                    }
                })
                let func = (event: MouseEvent) => {
                    flag = false;
                }
                el.addEventListener('mouseleave', func);

                el.addEventListener('mouseup', (event: MouseEvent) => {
                    const halfWidth = (window.innerWidth - element.offsetWidth) / 2;
                    const left = element.style.left.substring(0, element.style.left.length-2); 
                    if(element.offsetLeft == ''){
                        return;
                    }
                    if(left > halfWidth){
                        element.style.left = Math.ceil(document.documentElement.clientWidth - (element.clientWidth)) + 'px';
                    } else {
                        element.style.left = '0px';
                    }
                    flag = false;
                })

            }
        });
    }
}