<template>
   <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" background-color="#3a4149" text-color="#fff"
      active-text-color="#99ffff">
      <EpMenuUnit :menu="menu" :parentIndex="''" />
   </el-menu>
</template>

<script setup lang="ts">
import EpMenuUnit from './EpMenuUnit.vue';
import { defineProps } from 'vue';

const props = defineProps<{
   activeIndex: string;
   menu: any[];
}>();

const { activeIndex, menu } = props;
</script>

<style lang="scss" scoped>
/* Add your styles here */
</style>
