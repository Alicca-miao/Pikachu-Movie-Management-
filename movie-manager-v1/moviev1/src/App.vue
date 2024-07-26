<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import MyPageHeader from '@/components/MyPageHeader.vue';
// import EpMenu from '@/components/menu/EpMenu.vue';
// import aa from '@/components/menu/eptry.vue';
import {computed} from 'vue'
import {
  Grid,
  PictureFilled,
  Star,
  LocationFilled,
  Film,
  VideoCameraFilled,
  Histogram,
  PieChart,
  ArrowLeftBold,
  SwitchButton,
  User,
} from "@element-plus/icons-vue";

// import login from '@/views/Login.vue'

</script>

<template>
  <div>
    <MyPageHeader v-if="!$route.meta.hidePageHeader" title="欢迎光临皮卡丘电影管理后台" @action-btn-click="onActionBtnClick">
      <!-- 覆盖action按钮插槽默认内容 -->
      <template #action>
        <el-icon size="24" class="content-elem pointer" v-change="{ color: 'cyan' }">
          <SwitchButton />
        </el-icon>
      </template>
    </MyPageHeader>
    <main>

      <div class="left">

        <el-menu class="el-menu-vertical-demo" menu-trigger="hover">

          <!-- 影片管理 -->
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <Film />
              </el-icon>
              <span>影片管理</span>
            </template>

            <!-- 正在热映 -->
            <el-menu-item index="2-1">
              <el-icon>
                <VideoCameraFilled />
              </el-icon>
              <RouterLink class="tab" to="/film/playing">正在热映</RouterLink>
            </el-menu-item>

            <!-- 即将上映 -->
            <el-menu-item index="2-2">
              <el-icon>
                <Histogram />
              </el-icon>
              <RouterLink class="tab" to="/film/coming">即将上映</RouterLink>
            </el-menu-item>
          </el-sub-menu>

          <!-- 影院管理 -->
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <PictureFilled />
              </el-icon>
              <span>影院管理</span>
            </template>

            <!-- 热门城市 -->
            <el-sub-menu index="3-1">
              <template #title>
                <el-icon>
                  <Star />
                </el-icon>
                热门城市
              </template>

              <el-menu-item index="3-1-1">
                <RouterLink class="tab" to="/cinema/hot">北京</RouterLink>
              </el-menu-item>
              <el-menu-item index="3-1-2">
                <RouterLink class="tab" to="/cinema/hot">上海</RouterLink>
              </el-menu-item>
              <el-menu-item index="3-1-3">
                <RouterLink class="tab" to="/cinema/hot">广州</RouterLink>
              </el-menu-item>
              <el-menu-item index="3-1-3">
                <RouterLink class="tab" to="/cinema/hot">深圳</RouterLink>
              </el-menu-item>
              <el-menu-item index="3-1-3">
                <RouterLink class="tab" to="/cinema/hot">江苏</RouterLink>
              </el-menu-item>
              <el-menu-item index="3-1-3">
                <RouterLink class="tab" to="/cinema/hot">成都</RouterLink>
              </el-menu-item>
              <el-menu-item index="3-1-3">
                <RouterLink class="tab" to="/cinema/hot">厦门</RouterLink>
              </el-menu-item>
            </el-sub-menu>

            <!-- 所有城市 -->
            <el-menu-item index="3-2">
              <el-icon>
                <LocationFilled />
              </el-icon>
              <RouterLink class="tab" to="/cinema/all">所有城市</RouterLink>
            </el-menu-item>
          </el-sub-menu>

          <!-- 用户管理 -->
          <el-menu-item index="4">
            <el-icon>
              <User />
            </el-icon>
            <RouterLink class="tab" to="/user">用户管理</RouterLink>
          </el-menu-item>

          <!-- 案例管理 -->
          <el-menu-item index="5">
            <el-icon>
              <Grid />
            </el-icon>
            <RouterLink class="tab" to="/data">数据看板</RouterLink>
          </el-menu-item>
        </el-menu>

      </div>

      <div class="right">

        <router-view v-slot="{ Component }">
          <!-- <transition name="slide-fade" mode="out-in"> -->
            <!-- <keep-alive :exclude="[`Detail`]"> -->
            <component :is="Component" />
            <!-- </keep-alive> -->
          <!-- </transition> -->
        </router-view>

      </div>


    </main>







  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/variable.scss";
@import "@/assets/mixin.scss";

.tab {
  margin: 5px;
}

main {
  display: flex;
  // width: calc(1000px - 1rem * 2);
  height: calc(1200px - 1rem * 2);
  // border-top: 1px solid $gray4;

  .left {
    width: 210px;
    height:calc(1200px - 1rem * 2);
    padding-right: 1px;
    // background-color: ;
    // border-right: 1px solid $graya;
.is-active {
    background-color:white;
  }
    .el-menu-vertical-demo a {
      color: black;
    }
        .el-menu .el-menu-item .is-opened {
          background-color: #f5f5f5;
          /* 浅灰色背景 */
          color: #333333;
          /* 深色文本 */
        }
  }

  .right {
    flex-grow: 1;
    // width: 800px;
    // max-width: 800px;
    // background-color: green;
    padding: 1rem;
    width: calc(1200px - 200px - 1rem * 2);
  }
        
}
</style>
