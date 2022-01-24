/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2022-01-12 16:27:52
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-18 17:10:32
 */
import { defineComponent, reactive, onMounted, computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import topNavBar from '@/components/topNavBar/index.vue';
import Home from '@/service/home.service';
import SingerDetail from '@/service/singerDetail.service';
import constant from '@/assets/js/constant';
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
        const store = useStore();
        const albumScroll = ref(null);
        const singerScroll = ref(null);
        const songsScroll = ref(null);
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
            const ids = res[0].arr.map(ele => ele.id).join(',');
            const { songs } = await SingerDetail.getSongsDetail(ids);
            state.searchAll = res;
            state.searchAll[0].arr = songs;
            const options = {
                click: true,
                scrollX: true,
                scrollY: false,
                mouseWheel: true,
                observeDOM: true
            }
            // 初始化专辑x轴列表
            initialDomRef(albumScroll, options);
            // 初始化歌手x轴列表
            initialDomRef(singerScroll, options);
            // 初始化歌曲x轴列表
            initialDomRef(songsScroll, {
                click: true,
                probeType: 3,
                observeDOM: true,
            });
        })

        // methods
        const leftClick = () => {
            router.push({ name: 'Home' })
        }
        const choseSongeItem = (item, index) => {
            console.log(item);
            let index2 = state.searchAll[0].arr.findIndex(ele => ele.id == item.id);
            console.log(index2);
            console.log(state.searchAll[0].arr);
            store.dispatch('initialMusicPlay', {list: state.searchAll[0].arr, playMode: constant.PLAY_MODE.sequence});
            store.commit('setCurrentIndex', null);
            setTimeout(() => {
                store.dispatch('setMusicPlay', index2)
            }, 500)
        }
        const initialDomRef = (domRef, setting) => new BScroll(domRef.value, setting);
        const jump1 = (item) => {
            console.log(item.id);
            router.push({
                path: `/SingerDetail/${item.id}`
            })
        }
        return {
            texts,
            albumScroll,
            singerScroll,
            songsScroll,
            loading,
            loadingText,
            state,
            leftClick,
            choseSongeItem,
            jump1
        }
    },
})