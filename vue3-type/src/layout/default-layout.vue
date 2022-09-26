<template>
  <a-layout class="layout">
    <a-layout-sider class="layout-sider">
        <Menu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <Navbar />
      </a-layout-header>
      <a-layout-content>
        <PageLayout />
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Navbar from "@/components/navbar/index.vue";
import Menu from "@/components/menu/index.vue";
import PageLayout from "./page-layout.vue";

</script>

<style scoped lang="scss">
.layout{
  width: 100%;
  height: 100%;
}
</style>