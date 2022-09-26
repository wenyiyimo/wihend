<template>
  <div style="margin-top: 200px">
    <a-form v-show="cart.length" :style="{width:'600px'}">
      <a-form-item v-for="(item,index) in cart" :key="index" :label="item.name+':'+item.price+'元'">
        <a-input-number @change="countChange(index,$event)" :min="0" :max="item.stock" :style="{width:'320px'}"
                        placeholder="Please Enter" :model-value="item.count" :default-value="0" mode="button"
                        class="input-demo"/>
      </a-form-item>
      <a-form-item field="originalPrice" label="原价">
        <a-input-number :style="{width:'320px'}" :model-value="realTotalPrice" placeholder="Please Enter"
                        :default-value="0" class="input-demo" disabled/>
      </a-form-item>
      <a-form-item field="totalPrice" label="总价">
        <a-input-number :style="{width:'320px'}" :model-value="totalPrice" placeholder="Please Enter" :default-value="0"
                        class="input-demo" disabled/>
      </a-form-item>
    </a-form>
    <a-empty :style="{width:'600px'}" v-show="!cart.length"/>
  </div>

</template>

<script lang="ts">
import {
  ref,
  Ref,
  computed,
  watch,
  defineComponent,
  onMounted,
  reactive
} from 'vue'

export default defineComponent({
  name: 'login',
  setup() {
    const n = ref(100)
    const [cart, totalPrice, countChange] = useGetCart()
    const realTotalPrice = useCoupon(totalPrice)
    return {cart, totalPrice, realTotalPrice, n, countChange}
  },
})

/*
* 获取购物车详情
* */
function useGetCart() {
  const cart = reactive<{ name: string; count: number; stock: number; price: number }[]>([])
  /*模拟请求*/
  setTimeout(() => {
    cart.push({
      name: '橡胶',
      stock: 50,
      count: 30,
      price: 10
    }, {
      name: '原油',
      stock: 30,
      count: 10,
      price: 21
    })
  }, 1000)

  /*计算总价格*/
  const totalPrice = computed(() => {
    return cart.reduce((total, item) => item.count * item.price + total, 0)
  })

  const countChange = (index: number, e: number) => {
    cart[index].count = e;
  }

  return [cart, totalPrice, countChange] as const
}

/*获取用户的优惠券*/
function useCoupon(totalPrice: Ref<number>) {
  const realTotalPrice = ref(0)

  setTimeout(() => {
    const coupon = 9
    /*监听*/
    watch(totalPrice, (value) => {
      realTotalPrice.value = value - coupon
    }, {
      immediate: true
    })
  }, 1000)

  return realTotalPrice
}


</script>






















