import { createApp } from 'vue';
export default function registerLoadingDirective(component) {
    function appendChild(el){
        el.appendChild(el.instance.$el);
    }
    function removeChild(el){
        if([...el.children].find(ele => ele == el.instance.$el)){
            el.removeChild(el.instance.$el);
        }
    }
    return {
        mounted(el, context) {
            const loadingText = context.arg;
            const { flag } = context.value;
            const app = createApp(component);
            const instance = app.mount(document.createElement('div'));
            !!loadingText ? instance.setTitle(loadingText) : '';
            el.instance = instance;
            if(flag){
                appendChild(el);
            }
        },
        updated(el, context){
            const { flag } = context.value;
            const { flag: flag2 } = context.oldValue;
            if(flag != flag2){
                setTimeout(() => {
                    flag ? appendChild(el) : removeChild(el);
                }, 1000)
            }
        }
    }
}