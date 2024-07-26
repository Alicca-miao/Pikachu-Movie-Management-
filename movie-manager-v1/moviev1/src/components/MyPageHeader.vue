<template>
  <div class="epHeader" v-if="!$route.meta.hideFrame">

    <!-- 左侧返回按钮：导航回退 -->
    <div class="left" @click="$router.back">
      <el-icon>
        <ArrowLeftBold />
      </el-icon>
    </div>

    <!-- 中间显示父组件注入的标题 -->
    <div class="middle">{{ title }}</div>

    <div class="right">

      <!-- Element头像 -->
      <!-- src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" -->
      <el-avatar :size="24" class="mr-3" :src="url" />

      <!-- 欢迎回来 -->
      <span class="content-elem">欢迎回来:
        <span class="pointer username" v-change="{ color: 'cyan' }">admin</span>
      </span>

      <!-- 右侧action按钮区：点击时通知父组件 -->
      <div class="action pointer centerbox" @click="emit(`actionBtnClick`, Date.now())">

        <!-- action按钮默认使用X号按钮 父组件可以通过具名插槽覆盖action按钮 -->
        <slot name="action">
          <!-- 当用户点击action btn的时候 通知父组件 让父组件决定该干什么 -->
          <el-icon size="24">
            <CloseBold />
          </el-icon>
        </slot>
      </div>

    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import {ref} from 'vue'
import dogImage from '../assets/admin.gif'; // 使用 import 语法
import {
  ArrowLeftBold,
  SwitchButton,
  CloseBold,
} from "@element-plus/icons-vue";

/* 定义props */
const { title } = defineProps({
  title: String,
});
let url = ref(dogImage)

/* 定义向父组件发送的事件 */
const emit = defineEmits({
  actionBtnClick: null,
});
</script>

<style lang="scss" scoped>
@import "@/assets/variable.scss";
@import "@/assets/mixin.scss";

.epHeader {
  height: 60px;
  background-color: rgb(250, 225, 247);
  color: black;
  padding: 0 20px;
  display: flex;
  align-items: center;
  //xin xia

  // position: relative;

  .left {
    background-color: rgba($color: #fff, $alpha: 0.1);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    @include centeredFlexBox;
    color: black;
    cursor: pointer;
//xin xiua
    // margin-top: 10px; // 增加上方的 margin-top，使其距离上方更远
      // flex: 1; // 确保 .left 部分的宽度可以伸展
  }

  .middle {
    margin-left: 20px;
    font-size: 16px;
    // color: rgb(146, 251, 255);
    font-style: italic;
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    // flex-grow: 1;
    //xin xia
    flex: 1; // 确保 .right 部分的宽度可以伸展
      overflow: hidden; // 确保内容不会超出容器

    .content-elem {
      margin-left: 10px;
      margin-right: 10px;
      color: white;
      font-size: 14px;
    }

    .username {
      color: blue;
    }
  }
}
</style>
