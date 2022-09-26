<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="collapse"
  >
    <router-link to="/">
      <el-menu-item index="1">
        <el-icon-menu></el-icon-menu>
        <span>首页</span>
      </el-menu-item>
    </router-link>
    <router-link to="/icon">
      <el-menu-item index="2">
        <el-icon-menu></el-icon-menu>
        <span>图标</span>
      </el-menu-item>
    </router-link>
    <el-menu-item index="3">
      <el-icon-menu></el-icon-menu>
      <span>Navigator Two</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import {defineProps} from "vue";

let props = defineProps<{
  collapse: boolean,
}>();

</script>

<style scoped>

</style>
