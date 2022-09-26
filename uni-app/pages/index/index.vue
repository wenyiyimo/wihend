<template>
	<view class="content">
		<image @click="toLogin()" class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{userInfo.nickname}}</text>
		</view>
	</view>
</template>

<script>
  import {mapGetters} from 'vuex'
  import request from '@/common/request.js'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
    computed: {
    	...mapGetters(['hasLogedIn', 'userInfo'])
    },
		onLoad() {

		},
		methods: {
      toLogin(){
        request.request({
          url: '/api/user/UserIndex/login',
          data: {name: 'nickname'},
          method: 'POST'
        }).then(res => {
          // success
        }).catch(err => {
          // error
        })
        /* uni.navigateTo({
          url:"/pages/login/login"
        }) */
      }
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
