import {defineComponent, onMounted, reactive, ref, computed, watch } from 'vue';
export default defineComponent({
    name: 'shortCut',
    props: {
        singerList: {
            default: {},
            type: Object
        },
        titleIndex: 0
    },
    emits: ['itemClick'],
    setup(props, { emit }){
        const list1 = ref([]);
        const titleIndex = ref(0);
        let touch = {};
        watch(() => props.singerList, (newVal, oldVal) => {
            if(!!Object.keys(newVal).length){
                initialShortCut(newVal)
            }
        })
        watch(() => props.titleIndex, (newVal, oldVal) => {
            titleIndex.value = newVal;
        })
        // 初始化列表
        const initialShortCut = (originObj) => {
            let list = [];
            Object.keys(originObj).forEach((ele, index) => {
                list.push(originObj[ele]);
            })
            list1.value = list;
        }
        const touchStart = (e) => {
            console.log(e);
            touch['y1'] = e.touches[0].pageY
            touch['y1Index'] = e.target.dataset.index;
            emit('itemClick', e.target);
        }

        const touchMove = (e) => {
            touch['y2'] = e.touches[0].pageY;
            touch['y2Index'] = (touch['y2'] - touch['y1']) / 20 | 0;
            console.log(touch.y1Index, touch.y2Index)
        }

        return {
            list1,
            titleIndex,
            touchStart,
            touchMove
        }
    }
})