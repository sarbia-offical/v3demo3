import {defineComponent, onMounted, reactive, ref, computed} from 'vue';
import PLAY_MODE from '@/assets/js/constant';
import homeService from '@/service/home.service';
import { useStore, mapActions } from 'vuex';
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel';
import ObserveDOM from '@better-scroll/observe-dom';
BScroll.use(MouseWheel).use(ObserveDOM);
export default defineComponent({
    name: 'headBar',
    components: {
    },
    setup(props, { attrs, slots, emit }){
        const listRef = ref(null);
        const loadingText = ref('加载中...');
        const bodyState = reactive({
            list: [],
            currentIndex: 0
        });
        const store = useStore();
        // setTimeout(() => {
        //     bodyState.list = [
        //         {
        //             name: '残酷な天使のテーゼ',
        //             id: '657666',
        //             al: {
        //                 name: '残酷な天使のテーゼ / FLY ME TO THE MOON',
        //                 id: 63263,
        //                 picUrl: 'http://p3.music.126.net/45hISoQHiPTbPg9oapc7DQ==/109951163549396167.jpg',
        //                 tns: [],
        //                 pic_str: '09951163549396167',
        //                 pic: 109951163549396160
        //             },
        //             ar: [
        //                 {
        //                     "id": 17909,
        //                     "name": "高橋洋子",
        //                     "tns": [
        //                         "高桥洋子",
        //                         "高桥洋子"
        //                     ],
        //                     "alias": [
        //                         "Yoko TAKAHASHI"
        //                     ],
        //                     "alia": [
        //                         "Yoko TAKAHASHI"
        //                     ]
        //                 }
        //             ],
        //             icon: 'icon-light'
        //         },
        //         {
        //             name: '残酷な天使のテーゼ',
        //             id: '657666',
        //             al: {
        //                 name: '残酷な天使のテーゼ / FLY ME TO THE MOON',
        //                 id: 63263,
        //                 picUrl: 'http://p4.music.126.net/vRpg5LhWgkVEO6hbGPUh_w==/109951165809231238.jpg',
        //                 tns: [],
        //                 pic_str: '09951163549396167',
        //                 pic: 109951163549396160
        //             },
        //             ar: [
        //                 {
        //                     "id": 17909,
        //                     "name": "高橋洋子",
        //                     "tns": [
        //                         "高桥洋子"
        //                     ],
        //                     "alias": [
        //                         "Yoko TAKAHASHI"
        //                     ],
        //                     "alia": [
        //                         "Yoko TAKAHASHI"
        //                     ]
        //                 }
        //             ],
        //             icon: 'icon-light-fill'
        //         },
        //         {
        //             name: '残酷な天使のテーゼ',
        //             id: '657666',
        //             al: {
        //                 name: '残酷な天使のテーゼ / FLY ME TO THE MOON',
        //                 id: 63263,
        //                 picUrl: 'http://p3.music.126.net/45hISoQHiPTbPg9oapc7DQ==/109951163549396167.jpg',
        //                 tns: [],
        //                 pic_str: '09951163549396167',
        //                 pic: 109951163549396160
        //             },
        //             ar: [
        //                 {
        //                     "id": 17909,
        //                     "name": "高橋洋子",
        //                     "tns": [
        //                         "高桥洋子"
        //                     ],
        //                     "alias": [
        //                         "Yoko TAKAHASHI"
        //                     ],
        //                     "alia": [
        //                         "Yoko TAKAHASHI"
        //                     ]
        //                 }
        //             ],
        //             icon: 'icon-light'
        //         },
        //         {
        //             name: '残酷な天使のテーゼ',
        //             id: '657666',
        //             al: {
        //                 name: '残酷な天使のテーゼ / FLY ME TO THE MOON',
        //                 id: 63263,
        //                 picUrl: 'http://p3.music.126.net/45hISoQHiPTbPg9oapc7DQ==/109951163549396167.jpg',
        //                 tns: [],
        //                 pic_str: '09951163549396167',
        //                 pic: 109951163549396160
        //             },
        //             ar: [
        //                 {
        //                     "id": 17909,
        //                     "name": "高橋洋子",
        //                     "tns": [
        //                         "高桥洋子"
        //                     ],
        //                     "alias": [
        //                         "Yoko TAKAHASHI"
        //                     ],
        //                     "alia": [
        //                         "Yoko TAKAHASHI"
        //                     ]
        //                 }
        //             ],
        //             icon: 'icon-light'
        //         },
        //         {
        //             name: '残酷な天使のテーゼ',
        //             id: '657666',
        //             al: {
        //                 name: '残酷な天使のテーゼ / FLY ME TO THE MOON',
        //                 id: 63263,
        //                 picUrl: 'http://p3.music.126.net/45hISoQHiPTbPg9oapc7DQ==/109951163549396167.jpg',
        //                 tns: [],
        //                 pic_str: '09951163549396167',
        //                 pic: 109951163549396160
        //             },
        //             ar: [
        //                 {
        //                     "id": 17909,
        //                     "name": "高橋洋子",
        //                     "tns": [
        //                         "高桥洋子"
        //                     ],
        //                     "alias": [
        //                         "Yoko TAKAHASHI"
        //                     ],
        //                     "alia": [
        //                         "Yoko TAKAHASHI"
        //                     ]
        //                 }
        //             ],
        //             icon: 'icon-light'
        //         },
        //         {
        //             name: '残酷な天使のテーゼ',
        //             id: '657666',
        //             al: {
        //                 name: '残酷な天使のテーゼ / FLY ME TO THE MOON',
        //                 id: 63263,
        //                 picUrl: 'http://p3.music.126.net/45hISoQHiPTbPg9oapc7DQ==/109951163549396167.jpg',
        //                 tns: [],
        //                 pic_str: '09951163549396167',
        //                 pic: 109951163549396160
        //             },
        //             ar: [
        //                 {
        //                     "id": 17909,
        //                     "name": "高橋洋子",
        //                     "tns": [
        //                         "高桥洋子"
        //                     ],
        //                     "alias": [
        //                         "Yoko TAKAHASHI"
        //                     ],
        //                     "alia": [
        //                         "Yoko TAKAHASHI"
        //                     ]
        //                 }
        //             ],
        //             icon: 'icon-light'
        //         }
        //     ]
        // },5000)
        const headBarLeftClick = () => {
            emit('lftClick')
        };
        const headBarRightClick = () => {
            emit('rgtClick');
        };
        //初始化歌曲列表下拉组件
        const initialList = (domRef) => {
            const bs = new BScroll(domRef.value, {
                click: true,
                mouseWheel: {
                    speed: 20,
                    invert: false,
                    easeTime: 300
                },
                observeDOM: true
            })
        }
        const play = (item, index) => {
            console.log(item, index)
            bodyState.currentIndex = index;
            store.dispatch('setMusicPlay', {list: bodyState.list, index: index, playMode: PLAY_MODE.sequence});
        }
        // 计算属性
        let loading = computed(() => {
            return !bodyState.list.length;
        })
        onMounted(async () => {
            initialList(listRef);
            const { code, msg, result } = await homeService.getSongsByName('yellow');
            console.log(result)
            bodyState.list = result.songs;
        })
        return {
            bodyState,
            listRef,
            loading,
            loadingText,
            headBarLeftClick,
            headBarRightClick,
            play
        }
    }
})