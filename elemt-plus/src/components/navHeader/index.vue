<template>
  <div class="header">
    <span @click="toggle">
      <el-icon-expand v-if="collapse"></el-icon-expand>
      <el-icon-fold v-else></el-icon-fold>
  </span>
  </div>

</template>

<script setup lang="ts">
import {ref, defineProps, defineEmits} from "vue";

let props = defineProps<{
  collapse: boolean,
}>();

let emits = defineEmits(['update:collapse']);

let toggle = () => {
  emits('update:collapse', !props.collapse);
};


</script>

<style scoped lang="scss">
.header{
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: #eeeeee solid 1px;
}
</style>
