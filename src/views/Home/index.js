import {defineComponent, reactive, ref} from 'vue';
import Body from './components/Body/index.vue';
import SidebarMenu from './components/SidebarMenu/index.vue';
export default defineComponent({
    name: 'Home',
    setup(){
        const circleRef = ref(null);
        const state = reactive({
            showLeft: false,
            showRight: false,
            list: []
        });
        const headBarLeftClick = () => {
            state.showLeft = true;
        };
        const headBarRightClick = () => {
            state.showRight = true;
        }
        return {
            state,
            circleRef,
            headBarLeftClick,
            headBarRightClick
        }
    },
    components: {
        Body,
        SidebarMenu
    }
})