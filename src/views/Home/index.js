import {defineComponent, reactive, ref, onMounted} from 'vue';
import headBar from './components/headBar/index.vue';
import sidebarMenu from './components/sidebarMenu/index.vue';
import homeService from '../../service/home.service';
export default defineComponent({
    name: 'Home',
    setup(){
        const circleRef = ref(null);
        const state = reactive({
            showLeft: false,
            showRight: false
        });
        const headBarLeftClick = () => {
            state.showLeft = true;
        };
        const headBarRightClick = () => {
            state.showRight = true;
        }
        // mounted钩子函数
        onMounted( async () => {
            const res = await homeService.getSongsByName('sound of silence');
            console.log(res)
        })
        return {
            state,
            circleRef,
            headBarLeftClick,
            headBarRightClick
        }
    },
    components: {
        headBar,
        sidebarMenu
    }
})