<template>
  <div>
    <a-space class="n-ps-top-base n-ps-left-base">
      <a-dropdown trigger="click" @select="changeLocale">
        <a-button type="primary">切换语言</a-button>
        <template #content>
          <a-doption
              v-for="item in locales"
              :key="item.value"
              :value="item.value"
          >
            {{ item.label }}
          </a-doption>
        </template>
      </a-dropdown>

      {{ $t('index.hello') }}
    </a-space>
    <div class="n-ps-top-base n-ps-left-base">
      <a-space>
        <a-button type="primary" @click="addDBIndex('school')">增加</a-button>
        <a-button type="primary" @click="updateDBIndex('school',2)" status="warning">修改</a-button>
        <a-button type="primary" @click="deleteDBIndex('school',1)" status="danger">删除</a-button>
        <a-button type="primary" @click="queryDBIndex('school',2)" status="success">查询</a-button>
      </a-space>
    </div>

  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/navbar/index.vue';
import useLocale from '@/hooks/loacle';
import {LOCALE_OPTIONS} from '@/loacle';
import DB from '@/utils/indexedDB';

const locales = [...LOCALE_OPTIONS];
const {changeLocale} = useLocale();
const DBInstance = new DB('Wihend');

DBInstance.openDB('school', 'id',['class','seat']);

function addDBIndex(storeName: string) {
  DBInstance.updateData(storeName, {class: '三年级一班', seat: '第一桌'});
}

function updateDBIndex(storeName: string, id: number) {
  DBInstance.updateData(storeName, {id:id,class: '三年级二班', seat: '第二桌'});
}

function deleteDBIndex(storeName: string,key: number) {
  DBInstance.deleteData(storeName, key);
}

function queryDBIndex(storeName: string,key: number) {
  DBInstance.queryData(storeName, key);
}

</script>

<style scoped lang="scss">


</style>
