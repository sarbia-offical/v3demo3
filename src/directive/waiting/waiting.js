import { createApp } from 'vue';
export default function createWaitingDirective(component) {
    function appendChild(el){
        el.appendChild(el.instance.$el)
    }
    function removeChild(el){
        if([...el.children].find(ele => ele == el.instance.$el)){
            el.removeChild(el.instance.$el);
        }
    }
    return {
        mounted(el, content) {
            const title = content.arg;
            const { flag } = content.value || {};
            const app = createApp(component);
            const instance = app.mount(document.createElement('div'));
            !!title ? instance.setTitle(title) : '';
            el.instance = instance;
            if(flag){
                el.appendChild(instance.$el)
            }
        },
        updated(el, content){
            const { flag } = content.value;
            const { flag: flag2 } = content.oldValue;
            if(flag != flag2){
                flag ? appendChild(el) : removeChild(el)
            }
        }
    }
}