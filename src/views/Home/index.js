/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-11-15 10:37:05
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-13 17:26:01
 */
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
import storage from '@/utils/storage';
import { Notify } from 'vant';
import Home from '@/service/home.service';
export default defineComponent({
    name: 'Home',
    setup() {
        const route = useRoute();
        const router = useRouter();
        const storagex = storage.getStorageFactory();
        // reactive
        const state = reactive({
            showLeft: false,
            showRight: false,
            flag: false,
            list: [],
            types: ['0', '1', '10', '100']
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
            if(searchText.value == null || searchText.value == undefined || searchText.value.trim() == ''){
                Notify('请输入查询内容');
                return;
            }
            let history = storagex.get('history') || [];
            history.push({
                keywords: searchText.value?.trim(),
                type: type.value
            })
            storagex.set('history', history);
            router.push({
                path: `/SearchPage/${searchText.value?.trim()}/${type.value}`
            })
        }
        const choseTag = (event) => {
            let index = event.target.dataset.currentindex;
            console.log(index);
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
            search,
            choseTag
        }
    },
    components: {
        Body,
        SidebarMenu
    }
})