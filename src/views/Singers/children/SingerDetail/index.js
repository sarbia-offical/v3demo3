import { defineComponent, reactive, ref, onMounted, computed, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import topNavBar from '@/components/topNavBar/index.vue';
import SingerDetail from '@/service/singerDetail.service'
import BScroll from '@better-scroll/core';
import MouseWheel from '@better-scroll/mouse-wheel';
import ObserveDOM from '@better-scroll/observe-dom';
import ScrollBar from '@better-scroll/scroll-bar'
BScroll.use(MouseWheel).use(ObserveDOM).use(ScrollBar);
export default defineComponent({
    name: 'singerDetail',
    props: ['singer'],
    emits: ['goTop'],
    components: {
        topNavBar
    },
    setup(props, { emit }) {
        const loadingText = ref('歌手信息正在搜寻中');
        const topNavBarRef = ref(null);
        const bgImageRef = ref(null);
        const imageHeight = ref(0);
        const navBarHeight = ref(0);
        const songsScrollRef = ref(null);
        const albumsScrollRef = ref(null);
        const songsRef = ref(null);
        const pullDown = ref(false);
        let bgImageY = 0;
        const startPoint = ref({
            x: 0,
            y: 0
        });
        const movePoint = ref({
            x: 0,
            y: 0
        })
        const state = reactive({
            texts: ['歌手详情'],
            artist: {},
            list: [],
            ablumList: [],
            limit: 50,
            offset: 0,
            singerId: 0
        });
        const route = useRoute();
        const store = useStore();
        console.log(store.dispatch('test'));
        onMounted(() => {
            const id = route.params.id;
            state.singerId = id;
            getSingerDetail(state.singerId);
            getSingerAlbum({
                limit: state.limit,
                offset: state.offset,
                id: state.singerId
            });
            imageHeight.value = bgImageRef.value.clientHeight;
            navBarHeight.value = topNavBarRef.value.$el.clientHeight;
            let options = {
                click: true,
                probeType: 2,
                mouseWheel: {
                    speed: 20,
                    invert: false,
                    easeTime: 300
                },
                observeDOM: true,
                scrollbar: true,
                stopPropagation: false
            };
            initialDomRef(songsScrollRef, options);
            initialDomRef(albumsScrollRef, options);
        })
        const loading = computed(() => !state.list.length);
        // 图片背景样式
        const bgImageStyle = computed(() => {
            let num = bgImageY / bgImageRef?.value?.clientHeight;
            let scale = pullDown.value && num >= 1 ? `scale(${num})` : 'scale(1)'
            let backDropFilter = !pullDown.value ? `backdropFilter(0px)` : `backdropFilter(0px)`
            return {
                backgroundImage: `url(${state.artist.img1v1Url}?param=375y375)`,
                paddingTop: '100%',
                backgroundSize: 'cover',
                transform: `${scale}`,
                transition: 'all .1s linear'
            }
        })
        const router = useRouter();
        // 获取歌手相关信息
        const getSingerDetail = async (id) => {
            await nextTick();
            const response = await SingerDetail.getSingerDetail(id + '');
            const { artist, hotSongs } = response;
            state.artist = artist;
            state.list = hotSongs;
            return response;
        }
        // 获取歌手所有专辑
        const getSingerAlbum = async (params) => {
            const response = await SingerDetail.getSingerAlbum(params);
            const { hotAlbums } = response;
            const arr = hotAlbums.map((item, index) => ({
                name: item.name,
                company: item.company,
                picUrl: item.picUrl,
                blurPicUrl: item.blurPicUrl,
                subType: item.subType
            }));
            state.ablumList = state.ablumList.concat(arr);
            return response;
        }
        // 返回事件
        const leftClick = () => {
            router.push({ name: 'Singers' })
        }
        // 歌曲和专辑框上拉开始事件
        const touchStart = (event) => {
            const { touches } = event;
            startPoint.value['x'] = touches[0].pageX;
            startPoint.value['y'] = touches[0].pageY - songsRef.value.offsetTop;
        }
        // 歌曲和专辑上拉移动事件
        const touchMove = (event) => {
            console.log(event);
            const { touches, target } = event;
            let songsOffsetTop = songsRef.value.offsetTop;
            let bodyOffsetHeight = document.body.offsetHeight;
            bgImageY = touches[0].pageY;
            console.log(target.className)
            if (parseInt(songsOffsetTop) >= (parseInt(bodyOffsetHeight / 2) + 10)) {
                pullDown.value = true;
            } else {
                pullDown.value = false;
            }
            if (target.className != 'swipe-indicator') {
                return;
            }
            if (parseInt(songsOffsetTop) <= parseInt(bodyOffsetHeight / 1.8) && parseInt(songsOffsetTop) >= parseInt(document.body.offsetHeight / 3)) {
                songsRef.value.style.top = touches[0].pageY - startPoint.value['y'] + 'px';
            }
        }
        // 停止事件
        const touchDown = (event) => {
            let bodyOffsetHeight = document.body.offsetHeight;
            let songsOffsetTop = songsRef.value.offsetTop;
            pullDown.value = false;
            if (parseInt(songsOffsetTop) < parseInt(bodyOffsetHeight / 3)) {
                songsRef.value.style.top = `${parseInt(bodyOffsetHeight / 3 + 1)}px`;
            } else if (parseInt(songsOffsetTop) > parseInt(bodyOffsetHeight / 1.8)) {
                songsRef.value.style.top = `${parseInt(bodyOffsetHeight / 2 + 1)}px`;
            }
        }
        // 生成bscrolldom
        const initialDomRef = (domRef, setting) => new BScroll(domRef.value, setting);
        // swipe的切换事件
        const swipeChange = (event) => {
        }
        // 滑动到顶部
        const goTop = () => {
            console.log(1)
            let bodyOffsetHeight = document.body.offsetHeight;
            songsRef.value.style.top = `${parseInt(bodyOffsetHeight / 3 + 1)}px`;
        }
        const show = () => {
            console.log('show')
        }
        return {
            bgImageStyle,
            state,
            loading,
            loadingText,
            topNavBarRef,
            bgImageRef,
            songsScrollRef,
            albumsScrollRef,
            songsRef,
            leftClick,
            swipeChange,
            touchStart,
            touchMove,
            touchDown,
            goTop,
            show
        }
    }
})