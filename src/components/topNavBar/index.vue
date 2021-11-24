<template>
  <div class="topNavBar">
    <van-navbar
      :title="texts[0]"
      left-text="返回"
      :right-text="texts[1]"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    ></van-navbar>
  </div>
</template>
<script>
  export default {
    name: 'topNavBar',
    props: {
      texts: {
        default: [],
        type: Array
      }
    },
    emits: ['leftClick', 'rightClick'],
    setup(props, { emit }){
      const onClickLeft = () => {
        emit('leftClick');
      }
      const onClickRight = () => {
        emit('rightClick');
      }
      return {
        onClickLeft,
        onClickRight
      }
    }
  }
</script>
<style scoped lang="scss">
  .topNavBar{

  }
</style>