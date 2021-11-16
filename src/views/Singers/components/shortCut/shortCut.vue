<template>
  <div class="shortCut"
  @touchstart.stop.prevent="touchStart"
  @touchmove.stop.prevent="touchMove">
    <div
        v-for="(item, index) in list1"
        :key="index"
        :class="{shortCutItem: true, shortCutItemActive: titleIndex == index}"
        :data-index="index">
      {{ item.title }}
    </div>
  </div>
</template>
<script>
import shortCut from './shortCut.js'
export default shortCut;
</script>
<style scoped lang="scss">
@import "./shortCut.scss";
</style>