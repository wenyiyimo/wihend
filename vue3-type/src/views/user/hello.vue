<template>
  <div>
    <h1>Hello 欢迎光临 请选择</h1>
    <p>
      <a-space>
        <a-button v-for="(item,index) in girls" :key="index" @click="selectGirls(index)">{{item}}</a-button>
      </a-space>
    </p>
    <p>
      you like this girl {{youLike}}
    </p>
    <p>
      <a-image width="200" :src="imgRefs"/>
    </p>
  </div>
</template>

<script lang="ts">
import {ref, reactive, toRefs, watch} from 'vue'
interface dataPore{
  girls:string[];
  youLike:string,
  selectGirls:(index:number)=>void
}

export default ({
  name: "hello",
  setup() {
    const data = reactive({
      girls:['小红','小刘','小王','小舅子'],
      youLike:'',
      selectGirls:(index:number)=>{
        data.youLike = data.girls[index]
      }
    });

    const img = reactive({
      result:null
    })


    const dataRefs = toRefs(data)
    const imgRefs = toRefs(img)

    return {
      ...dataRefs,
      imgRefs
    };
  }
})
</script>

<style scoped>

</style>
