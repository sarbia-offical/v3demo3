import { defineComponent, reactive, ref, onMounted, computed, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore, mapActions } from 'vuex';
import _ from 'lodash';
import topNavBar from '@/components/topNavBar/index.vue';
import SingerDetail from '@/service/singerDetail.service';
import constant from '@/assets/js/constant';
import BScroll from '@better-scroll/core';
import MouseWheel from '@better-scroll/mouse-wheel';
import ObserveDOM from '@better-scroll/observe-dom';
import ScrollBar from '@better-scroll/scroll-bar';
import PullUp from '@better-scroll/pull-up';
import {Dialog,Toast} from "vant";
BScroll.use(ObserveDOM).use(ScrollBar).use(PullUp);
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
        // 歌曲查询条件
        const songsSearchForm = ref();
        // 专辑查询条件
        const albumSearchForm = ref({})

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
            singerId: 0
        });
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        onMounted(() => {
            const id = route.params.id;
            state.singerId = id;
            albumSearchForm.value = {
                id,
                limit: 50,
                offset: 0
            }
            songsSearchForm.value = {
                id,
                order: 'hot',
                size: 0,
                offset: 0,
                limit: 20,
            }
            // 获取歌手相关信息
            getSingerDetail(state.singerId);
            // 获取歌手专辑
            getSingerAlbum(albumSearchForm.value);
            // 获取歌手歌曲
            getSingerSongs(songsSearchForm.value);
            imageHeight.value = bgImageRef.value.clientHeight;
            navBarHeight.value = topNavBarRef.value.$el.clientHeight;
            let options = {
                click: true,
                probeType: 3,
                mouseWheel: {
                    speed: 20,
                    invert: false,
                    easeTime: 300
                },
                observeDOM: true,
                scrollbar: true,
                stopPropagation: false,
                pullUpLoad: true
            };
            const songsScroll = initialDomRef(songsScrollRef, options);
            const albumScoll = initialDomRef(albumsScrollRef, options);
            songsScroll.on('pullingUp', () => {
                let query = Object.assign({}, songsSearchForm.value);
                query.size = query.size + 1;
                query.offset = query.limit * query.size;
                getSingerSongs(query, () => {
                    songsSearchForm.value.size = songsSearchForm.value.size + 1;
                    songsSearchForm.value.offset = songsSearchForm.value.limit * songsSearchForm.value.size;
                    songsScroll.finishPullUp();
                    songsScroll.refresh();
                })
            })
        })
        const loading = computed(() => !state.list.length);
        
        // 图片背景样式
        const bgImageStyle = computed(() => {
            let num = bgImageY / bgImageRef?.value?.clientHeight;
            let scale = pullDown.value && num >= 1 ? `scale(${num})` : 'scale(1)'
            let backDropFilter = !pullDown.value ? `backdropFilter(0px)` : `backdropFilter(0px)`
            return {
                backgroundImage: `url(${state.artist.cover}?param=375y375)`,
                paddingTop: '100%',
                backgroundSize: 'cover',
                transform: `${scale}`,
                transition: 'all .1s linear'
            }
        })
        // 获取歌手相关信息
        const getSingerDetail = async (id) => {
            const { code, data, message } = await SingerDetail.getArtistDetail(id + '');
            const { artist } = data;
            if(code == 200){
                state.artist = artist;
            } else {
                Dialog({
                    title: '请求异常 =。=',
                    message,
                    className: 'dialogStyle'
                })
                state.artist = {};
            }
            store.commit('setSinger', data)
        }
        // 获取歌手所有专辑
        const getSingerAlbum = async (params) => {
            const response = await SingerDetail.getSingerAlbum(params);
            const { hotAlbums, code, msg } = response;
            if(code === 200){
                const arr = hotAlbums.map((item, index) => ({
                    name: item.name,
                    company: item.company,
                    picUrl: item.picUrl,
                    blurPicUrl: item.blurPicUrl,
                    subType: item.subType
                }));
                state.ablumList = state.ablumList.concat(arr);
            }
            return response;
        }
        // 获取歌手所有歌曲
        const getSingerSongs = async (params, callBack) => {
            await nextTick();
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0
            });
            const response = await SingerDetail.getSingerAllSongs(params);
            const { code, more, msg, songs, total } = response;
            if(code === 200){
                store.dispatch('initialMusicPlay', {list: state.list, playMode: constant.PLAY_MODE.sequence});
                const ids = songs.map(ele => ele.id).join(',');
                const { songs: songs2, privileges, code: code2 } = await SingerDetail.getSongsDetail(ids);
                if(code2 == 200){
                    state.list = state.list.concat(songs2);
                    store.dispatch('initialMusicPlay', {list: state.list, playMode: constant.PLAY_MODE.sequence});
                    callBack && callBack();
                    Toast.clear();
                } else {
                    Dialog({
                        title: '请求异常 =。=',
                        message: '歌曲详情接口异常',
                        className: 'dialogStyle'
                    })
                    state.list = [];
                }
            } else {
                Dialog({
                    title: '请求异常 =。=',
                    message: msg,
                    className: 'dialogStyle'
                })
                state.list = [];
            }
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
            const { touches, target } = event;
            let songsOffsetTop = songsRef.value.offsetTop;
            let bodyOffsetHeight = document.body.offsetHeight;
            bgImageY = touches[0].pageY;
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
        const choseSongeItem = (item, index) => {
            console.log(item);
            let index2 = store.state.playList.findIndex(ele => ele.id == item.id);
            store.commit('setCurrentIndex', null);
            setTimeout(() => {
                store.dispatch('setMusicPlay', index2)
            }, 500)
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
            show,
            choseSongeItem
        }
    }
})