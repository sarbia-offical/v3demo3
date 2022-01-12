import {
    defineComponent,
    reactive,
    ref,
    computed,
    onMounted
} from 'vue';
import Body from './components/Body/index.vue';
import SidebarMenu from './components/SidebarMenu/index.vue';
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
    name: 'Home',
    setup() {
        const route = useRoute();
        const router = useRouter();
        // reactive
        const state = reactive({
            showLeft: false,
            showRight: false,
            flag: false,
            list: [],
            types: ['1', '10', '100']
        });

        // ref
        const circleRef = ref(null);
        const radio = ref('0');
        const searchText = ref(null);
        const searchForm = ref({});
        const loading = ref(false);
        const finished = ref(false);

        // onMounted
        onMounted(() => {
            searchForm.value = {
                size: 0,
                offset: 0,
                limit: 20,
            }
        })
        // computed
        const type = computed(() => state.types[radio.value]);

        // methods
        const headBarLeftClick = () => {
            state.showLeft = true;
        };
        const headBarRightClick = () => {
            state.showRight = true;
        }
        const typeCheck = () => {
            state.flag = true;
        }
        const search = async () => {
            router.push({
                path: `/SearchPage/${searchText.value}/${type.value}`
            })
        }
        return {
            state,
            circleRef,
            radio,
            searchText,
            loading,
            finished,
            headBarLeftClick,
            headBarRightClick,
            typeCheck,
            search
        }
    },
    components: {
        Body,
        SidebarMenu
    }
})