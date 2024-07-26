<template>
  <div>
    <!-- <p v-if="pmArray.length > 0">{{ pmArray.join(', ') }}</p>
    <p v-else>No parameters provided.</p> -->
    <h1 class="title">您要找的页面不翼而飞~🤣🤪😝</h1>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const pmArray = computed(() => {
  const pm = route.params.pm;
  return pm ? pm.split(',') : []; // 将 pm 处理为数组
});
</script>

<style lang="scss" scoped>
.title {
  background-color: white;
  margin-top: 50px;
}
</style>
