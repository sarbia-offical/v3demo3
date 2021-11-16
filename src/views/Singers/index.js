import { defineComponent, onMounted, watch, computed, ref, reactive, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import shortCut from './components/shortCut/shortCut.vue';
import singerService from '@/service/singer.service';
import BScroll from '@better-scroll/core';
import MouseWheel from '@better-scroll/mouse-wheel';
import ObserveDOM from '@better-scroll/observe-dom';
BScroll.use(MouseWheel).use(ObserveDOM);
export default defineComponent({
    name: 'Singers',
    components: {
        shortCut
    },
    setup() {
        const state = reactive({
            artists: [],
            classifyList: [
                [
                    {
                        typeName: '全部',
                        value: '-1'
                    },
                    {
                        typeName: '华语',
                        value: '7'
                    },
                    {
                        typeName: '欧美',
                        value: '96'
                    },
                    {
                        typeName: '日本',
                        value: '8'
                    },
                    {
                        typeName: '韩国',
                        value: '16'
                    },
                    {
                        typeName: '其他',
                        value: '0'
                    },
                ],
                [
                    {
                        typeName: '全部',
                        value: '-1'
                    },
                    {
                        typeName: '男歌手',
                        value: '1'
                    },
                    {
                        typeName: '女歌手',
                        value: '2'
                    },
                    {
                        typeName: '乐队',
                        value: '3'
                    }
                ]
            ],
            singerList: {},
            singerList2: [],
            artists2: [],
            type: '-1',
            area: '-1'
        });
        const router = useRouter();
        const route = useRoute();
        const loadingText = ref('大咖正在匆匆赶来~');
        const waitingText = ref('加载中');
        const singerSlideRef = ref(null);
        const singerListRef = ref(null);
        const topArtistIndex = ref(-1);
        const artistFlag = ref(false);
        const itemHeights = ref([]);
        const heightCount = ref(0);
        const scrollY = ref(0);
        const titleIndex = ref('');
        let scrollInstance = null;
        // 监听
        watch(() => state.singerList, async (newVal, oldVal) => {
            await nextTick();
            calcSingerListHeight();
        })
        watch(scrollY, (newVal, oldVal) => {
            let list = itemHeights.value;
            for(let i = 0; i < list.length - 1; i++){
                let curretItem = list[i];
                let nextItem = list[i+1];
                if (newVal > curretItem && newVal < nextItem) {
                    titleIndex.value = i;
                }
            }
        })
        // 初始化歌手列表
        onMounted( async () => {
            // 初始化推荐歌手滚动组件
            initialDomRef(singerSlideRef, {
                click: true,
                scrollX: true,
                scrollY: false,
                mouseWheel: true,
                observeDOM: true
            });
            // 初始化歌手列表滚动组件
            const singerList = initialDomRef(singerListRef, {
                click: true,
                probeType: 3,
                mouseWheel: {
                    speed: 20,
                    invert: false,
                    easeTime: 300
                },
                observeDOM: true
            });
            singerList.on('scroll', (position) => {
                scrollY.value = -position.y;
            })
            getArtist();
            getTopArtists();
            console.log(singerList)
            scrollInstance = singerList;
        });
        // 监听每个item的高度
        const calcSingerListHeight = () => {
            heightCount.value = 0;
            itemHeights.value = [];
            itemHeights.value.push(0);
            singerListRef.value.children[0].children.forEach((item, index) => {
                heightCount.value += item.clientHeight;
                itemHeights.value.push(heightCount.value);
            })
        }
        // 返回事件
        const onClickLeft = () => {
            router.go(-1);
        }
        // 进入主页事件
        const onClickRight = () => { router.push({ name: 'Home' }) }
        // 选择类型事件
        const chose = (typeName, value) => {
            state[typeName] = value;
            getArtist();
        }
        // 选择每日推荐歌手
        const artistClick = (item, index) => {
            topArtistIndex.value = index;
            setTimeout(() => {
                artistFlag.value = true;
            },250);
        }
        const closePopup = (item, index) => {
            topArtistIndex.value = -1;
        }
        const singerInfo = (item) => {
            artistFlag.value = true;
            console.log(item);
        }
        const loading = computed(() => {
            return !state.artists.length;
        });
        const waiting = computed(() => {
            return !state.artists2.length;
        });
        // 根据条件查询歌手
        const getArtist = async () => {
            state.artists2 = [];
            const { singerList, artists: artists2 } = await singerService.getArtist({
                type: state.type,
                area: state.area,
                offset: '1',
                limit: '100'
            })
            state.singerList = singerList;
            state.artists2 = artists2;
        }
        // 查询热门歌手
        const getTopArtists = async () => {
            const { artists, code, more, msg } = await  singerService.getTopArtists({
                offset: '0',
                limit: '30'
            })
            state.artists = artists;
        }
        const itemClick = (event) => {
            let elements = singerListRef.value.children[0].children;
            let ele = elements[event.dataset.index];
            console.log(event.dataset.index)
            scrollInstance.scrollToElement(ele, 0);
        }
        const initialDomRef = (domRef, setting) => new BScroll(domRef.value, setting);
        return {
            onClickLeft,
            onClickRight,
            chose,
            artistClick,
            singerInfo,
            closePopup,
            itemClick,
            singerListRef,
            singerSlideRef,
            state,
            loading,
            waiting,
            loadingText,
            waitingText,
            topArtistIndex,
            artistFlag,
            scrollY,
            titleIndex
        }
    },
})