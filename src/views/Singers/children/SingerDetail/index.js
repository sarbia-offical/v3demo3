import {defineComponent, reactive, ref, onMounted, computed} from 'vue';
import { useRouter, useRoute } from 'vue-router';
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
    components: {
        topNavBar
    },
    setup(props, { emit }){
        const loadingText = ref('歌手信息正在搜寻中');
        const topNavBarRef = ref(null);
        const bgImageRef = ref(null);
        const imageHeight = ref(0);
        const navBarHeight = ref(0);
        const songsScrollRef = ref(null);
        const albumsScrollRef = ref(null);
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
                scrollbar: true
            };
            initialDomRef(songsScrollRef, options);
            initialDomRef(albumsScrollRef, options);
        })
        const loading = computed(() => !state.list.length);
        const router = useRouter();
        // 获取歌手相关信息
        const getSingerDetail = async (id) => {
            const response = await SingerDetail.getSingerDetail(id+'');
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
            console.log(state.ablumList)
            return response;
        }
        // 返回事件
        const leftClick = () => {
            router.push({ name: 'Singers' })
        }
        // 图片背景样式
        const bgImageStyle = () => {
            return {
                backgroundImage: `url(${state.artist.img1v1Url})`,
                paddingTop: '100%',
                backgroundSize: 'cover'
            }
        }
        // 歌曲列表样式
        const songsStyle = () => {
            const height1 = imageHeight.value;
            const height2 = navBarHeight.value;
            return {
                top: `50%`
            }
        }
        // 生成bscrolldom
        const initialDomRef = (domRef, setting) => new BScroll(domRef.value, setting);
        // swipe的切换事件
        const swipeChange = (event) => {
            console.log(event)
        }
        return {
            leftClick,
            bgImageStyle,
            songsStyle,
            state,
            loading,
            loadingText,
            topNavBarRef,
            bgImageRef,
            songsScrollRef,
            albumsScrollRef,
            swipeChange
        }
    }
})