/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2022-01-12 16:27:52
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-13 10:32:28
 */
import { defineComponent, reactive, onMounted, computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import topNavBar from '@/components/topNavBar/index.vue';
import Home from '@/service/home.service';
import BScroll from '@better-scroll/core';
import ObserveDOM from '@better-scroll/observe-dom';
BScroll.use(ObserveDOM)
export default defineComponent({
    name: 'searchPage',
    components: {
        topNavBar
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const singerScroll = ref(null);
        const loadingText = ref('正在努力搜索~');
        const state = reactive({
            types: { '0': '模糊查询', '1': '歌曲', '10': '专辑', 100: '歌手' },
            searchAll: []
        })

        // computed
        const texts = computed(() => {
            const { keywords, type } = route.params;
            return [`${state.types[type]}`];
        })

        const loading = computed(() => {
            return !state.searchAll.length;
        });

        onMounted(async () => {
            const { keywords } = route.params;
            const res = await Home.searchAllParams(keywords);
            console.log(res);
            state.searchAll = res;
            const options = {
                click: true,
                scrollX: true,
                scrollY: false,
                mouseWheel: true,
                observeDOM: true
            }
            initialDomRef(singerScroll, options);
        })

        // methods
        const leftClick = () => {
            router.push({ name: 'Home' })
        }
        const initialDomRef = (domRef, setting) => new BScroll(domRef.value, setting);
        
        return {
            texts,
            singerScroll,
            loading,
            loadingText,
            state,
            leftClick
        }
    },
})