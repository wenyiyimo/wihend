<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// 设置为暗黑主题
// document.body.setAttribute('arco-theme', 'dark')
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
import { computed } from "vue";
import useLocale from "@/hooks/loacle";


const { currentLocale } = useLocale();
const locale = computed(() => {
  switch (currentLocale.value) {
    case "zh-CN":
      return zhCN;
    case "en-US":
      return enUS;
    default:
      return zhCN;
  }
})

</script>

<template>
  <a-config-provider :locale="locale">
    <router-view></router-view>
  </a-config-provider>
</template>

<style lang="scss">
/*引入个人习惯css*/
@import "@/assets/style/main.scss";
@import "@/assets/style/global.scss";

</style>
