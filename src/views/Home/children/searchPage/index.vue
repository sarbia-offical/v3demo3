<!--
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2022-01-12 16:28:08
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-12 16:57:49
-->
<template>
    <div class="searchPage">
        <topNavBar :texts="state.texts" @leftClick="leftClick"></topNavBar>
    </div>    
</template>
<script>
import SearchPage from './index';
export default SearchPage;
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>