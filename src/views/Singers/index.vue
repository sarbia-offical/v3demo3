<template>
  <div class="singers" v-loading:[loadingText]="{flag: loading}">
    <!--  推荐歌手  -->
    <div class="singerTop">
      <topNavBar :texts="state.texts" @leftClick="onClickLeft"></topNavBar>
    </div>
    <div class="singerSlide">
      <div class="singerSlide-top">
        <div>每日推荐</div>
      </div>
      <div class="singerSlide-wrapper" ref="singerSlideRef">
        <div class="singerSlide-content">
          <div class="singerSlide-item"
           v-for="(item, index) in state.artists.slice(0,10)"
           :key="index"
           @click="artistClick(item, index)"
          >
            <div class="singerSlide-info">
              <div class="pic">
                <img v-lazy="item.picUrl + '?param=200y200'">
              </div>
              <div class="singer">
                {{ item.name }}
              </div>
              <div :class="{'icon': true, 'icon-active': topArtistIndex == index}">
                <iconComponent
                  :iconPath="'icon-user'"
                  :iconColor="'#8b0000'">
                </iconComponent>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!--  歌手分类  -->
    <div class="singerClassify">
      <div class="classify1">
        <div
            v-for="(item, index) in state.classifyList[0]"
            :key="index"
            :class="{item: true, active: state.area == item.value}"
            @click="chose('area',item.value)">
          {{ item.typeName }}
        </div>
      </div>
      <div class="classify1">
        <div
            v-for="(item, index) in state.classifyList[1]"
            :key="index"
            :class="{item: true, active: state.type == item.value}"
            @click="chose('type',item.value)">
          {{ item.typeName }}
        </div>
      </div>
    </div>
    <div v-waiting:[waitingText]="{flag: waiting}"></div>
    <div class="currentTitle" v-if="!!titleIndex">{{ Object.keys(state.singerList)[titleIndex] }}</div>
    <!--  快捷导航  -->
    <div class="shortCut">
      <shortCut
        @itemClick="itemClick"
        :singerList="state.singerList"
        :titleIndex="titleIndex"></shortCut>
    </div>
    <!--  歌手列表  -->
    <div class="list" ref="singerListRef">
      <div class="list-content">
        <div
            class="list-item"
            v-for="(item, index ) in state.singerList"
            :key="index">
          <div class="title">{{ item.title }}</div>
          <div class="content">
            <div
             v-for="(item2, index2) in item.list"
             :key="index2"
             class="singerInfo" @click="singerInfo(item2)">
              <div class="pic">
                <img v-lazy="item2.picUrl + '?param=200y200'">
              </div>
              <div class="name">{{ item2.name }}</div>
              <div class="right">
                <div class="btn">
                  <iconComponent
                      :iconPath="'icon-user_fill'"
                      :iconColor="'#8b0000'">
                  </iconComponent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  歌手详情  -->
<!--    <van-popup-->
<!--     v-model:show="artistFlag"-->
<!--     closeable-->
<!--     round-->
<!--     :style="{ height: '80%', width: '80%', padding: '5%' }"-->
<!--     @close="closePopup"-->
<!--    >内容</van-popup>-->
    <!--  子路由  -->
    <router-view v-slot="{ Component }">
      <transition appear name="slider">
        <component :is="Component" :singer="state.singerDetail"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import Singer from './index';
export default Singer;
</script>

<style scoped lang="scss">
@import "index";
</style>