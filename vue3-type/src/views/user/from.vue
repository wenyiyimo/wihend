<template>
  <a-form style="margin-top: 100px;" :model="form" :style="{width:'600px'}" @submit-success="handleSubmit">
    <a-form-item  :validate-trigger="['input','blur']" field="name" :rules="nameRules" label="手机号">
      <a-input v-model="form.name" placeholder="请输入手机号" />
    </a-form-item>
    <a-form-item :validate-trigger="['input','blur']" field="passWord" :rules="passRules" label="密码">
      <a-input-password v-model="form.passWord" placeholder="请输入密码" />
    </a-form-item>
    <a-form-item field="remember">
      <a-checkbox v-model="form.remember">
        记住账号
      </a-checkbox>
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit">登录</a-button>
    </a-form-item>
  </a-form>
  <span class="" style="margin-left: 100px;">
    {{form}}
  </span>
</template>

<script lang="ts">
import {computed, onMounted, reactive, ref, toRefs} from "vue";
import {login} from "@/api/user";
import { useStore } from 'vuex';

interface dataPore {
  form: {
    name: string;
    passWord: string;
    remember: boolean;
  };
  nameRules: any;
  passRules: any;
}
export default {
  name: "from",
  setup(){
    const store = useStore()

    const count = computed(() => store.getters.userInfo)

    console.log(count)

    const data:dataPore = reactive({
      form: {
        name: "15727527694",
        passWord: "12345678",
        remember: false
      },
      nameRules: [
        { required: true, message: "请输入手机号", trigger: "blur" },
        { min: 11, max: 11, message: "请输入11位手机号", trigger: "blur" },
        { validator: (value:string, callback:any) => {
          if (!value) {
            callback(new Error("请输入手机号"));
          } else if (!/^1[3456789]\d{9}$/.test(value)) {
            callback(new Error("请输入正确的手机号"));
          } else {
            callback();
          }
        }, trigger: "blur" }
      ],
      passRules: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 16, message: "请输入6-16位密码", trigger: "blur" }
      ]
    });

    const dataToRefs = toRefs(data);



    onMounted(()=>{


      /*axios.post( "http://10.1.1.10/api/user/UserIndex/login", {
        name: 21312321,
        passWord: 1231231
      },{
        headers:{
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })*/

    })

    const handleSubmit = (data:T) => {

        const json = Object.assign({}, data, {
          remember: data.remember ? 1 : 0
        })

        login(json).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        });

    }

    return{
      ...dataToRefs,
      handleSubmit
    }
  }
}
</script>

<style scoped>

</style>
