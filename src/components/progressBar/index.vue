<!--
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2022-01-04 08:59:27
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-05 11:23:54
-->
<template>
  <div class="progress-bar" ref="progressBar" @click="barClick">
    <div class="bar-inner">
      <div class="progress" ref="progress" :style="widthStyle"></div>
      <div class="progress-btn-wrapper" 
        :style="btnStyle"
        @touchstart.prevent="touchStart"
        @touchmove.prevent="touchMove"
        @touchend.prevent="touchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, watch, computed, ref } from "vue";
export default defineComponent({
  name: "progressBar",
  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },
  emits: ['touchMove', 'touchEnd'],
  setup(props, { emit }) {
    const transformX = ref(0);
    console.log('进入');
    console.log(props);
    const progressBar = ref(null);
    const progress = ref(null);
    const progressTransform = ref({});
    
    // 监听歌曲进度变化用以修改进度条位置
    watch(() => props.progress, (newVal, oldVal) => {
      if(!!newVal){
        transformX.value = (progressBar.value.clientWidth) * newVal
      }
    });

    // 黄色进度条宽度
    const widthStyle = computed(() => {
      return {
        width: `${transformX.value}px`
      }
    });

    // 按钮距离左边的位置
    const btnStyle = computed(() => {
        return {
            transform: `translate3d(${transformX.value}px, 0, 0)`
        }
    })

    // 监听手指点击
    const touchStart = e => {
        // 设置开始滑动进度条时的启始位置和黄色进度条的width
        progressTransform.value = {
            pageX: e.touches[0].pageX,
            beginWidth: progress.value.clientWidth
        }
    }

    // 监听手指滑动
    const touchMove = e => {
        // 计算出本次移动距离上次移动到距离，左滑为负值右滑为正值
        const delta = e.touches[0].pageX - progressTransform.value.pageX;
        // 算出黄色进度条的长度，可以直接将width设为黄色进度条的宽度，按照比例来乘就不需要设置滑动超出的最小值和最大值
        const width = progressTransform.value.beginWidth + delta;
        // 算出内层进度条和外层进度条的比例，max和min的使用算出一个在0和1之间的值
        const scale = Math.min(1, Math.max(width / progressBar.value.clientWidth , 0));
        transformX.value = progressBar.value.clientWidth * scale;
        emit('touchMove', scale);
    }

    // 监听手指离开
    const touchEnd = e => {
      console.log('离开');
      const scale = progress.value.clientWidth / progressBar.value.clientWidth;
      emit('touchEnd', scale);
    }

    // 进度条点击
    const barClick = e => {
      const left = progressBar.value.getBoundingClientRect().left;
      const scale = (e.pageX - left) / progressBar.value.clientWidth;
      emit('touchEnd', scale);
    }
    return {
      progressBar,
      progress,
      widthStyle,
      btnStyle,
      touchStart,
      touchMove,
      touchEnd,
      barClick
    }
  }
});
</script>

<style scoped lang="scss">
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -7px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>