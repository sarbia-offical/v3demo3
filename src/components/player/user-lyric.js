import { defineComponent, ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
export default function userLycis(){
    const store = useStore();
    const currentSongs = computed(() => store.getters.getCurrentSongs);
    watch(currentSongs, (newVal, oldVal) => {
        console.log(newVal);
    })
}