<!--
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2022-01-12 16:28:08
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-12 16:57:49
-->
<template>
    <div class="searchPage" v-loading:[loadingText]="{flag: loading}">
        <topNavBar :texts="texts" @leftClick="leftClick"></topNavBar>
        <div class="singer-container">
            <div class="scroll-wrapper" ref="singerScroll">
                <div class="scroll-content">
                    <div class="scroll-item" v-for="(item, index) in state.searchAll[1]?.arr" :key="index">
                        <div class="singer-avatar">
                            <div class="pic">
                                <img v-lazy="item.picUrl + '?param=200y200'">
                            </div>
                        </div>
                        <div class="text">
                            <div>{{ item.name }}</div>
                            <div style="color: #969696; font-size: .2rem">{{ item.artist.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
import SearchPage from './index';
export default SearchPage;
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>