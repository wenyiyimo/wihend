<template>
  <el-container>
    <el-aside width="auto">
      <nav-side v-model:collapse="isCollapse"/>
    </el-aside>
    <el-container>
      <el-header>
        <nav-header v-model:collapse="isCollapse"></nav-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import navSide from '@/components/navSide/index.vue'
import navHeader from '@/components/navHeader/index.vue'

const isCollapse = ref(true);

</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-header{
  padding: 0;
}
</style>
