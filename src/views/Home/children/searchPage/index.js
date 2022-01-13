/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2022-01-12 16:27:52
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-13 10:32:28
 */
import { defineComponent, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import topNavBar from '@/components/topNavBar/index.vue';
import Home from '@/service/home.service';
export default defineComponent({
    name: 'searchPage',
    components: {
        topNavBar
    },
    setup() {
        const route = useRoute();
        const router = useRouter();

        // reactive
        const state = reactive({
            texts: [' '],
        })

        onMounted(async () => {
            const { keywords, type } = route.params;
            const res = await Home.search({keywords, type})
            console.log(res);
        })

        // methods
        const leftClick = () => {
            router.push({ name: 'Home' })
        }
        
        return {
            state,
            leftClick
        }
        // const res = await Home.search({
        //     type: type.value,
        //     keywords: searchText.value
        // });
        // console.log(res);
    },
})