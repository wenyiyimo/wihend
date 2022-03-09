<template>
	<view ref="n-swiper-v" class="n-position-relative n-overflow-hidden" :style="mrStyle+boxStyle" @verticalpan="onPan">
		<slot></slot>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const bindingX = uni.requireNativePlugin("bindingx")
	// #endif
	
	import {getPx} from '../utils/system.js'
	
	/**
	 * 请注意：
	 * swiper-v在Android下不能使用在 scroll/list 中，无法触发手势。iOS下没有问题
	 */
	export default {
		name: 'n-swiper-v',
		props: {
			/**
			 * swiper的宽度
			 */
			width: {
				type: String,
				default: '750rpx'
			},
			/**
			 * swiper的高度
			 */
			height: {
				type: String,
				default: '360rpx'
			},
			/**
			 * 内容swiper-item的宽度
			 */
			itemWidth: {
				type: String,
				default: '600rpx'
			},
			/**
			 * 内容swiper-item的高度
			 */
			itemHeight: {
				type: String,
				default: '360rpx'
			},
			/**
			 * 左侧的间隙
			 */
			left: {
				type: String,
				default: '0'
			},
			/**
			 * 右侧的间隙
			 */
			right: {
				type: String,
				default: '0'
			},
			/**
			 * 内容之间的间隙
			 */
			space: {
				type: String,
				default: '64rpx'
			},
			/**
			 * 是否锁定：锁定时不能触发手势
			 */
			lock: {
				type: Boolean,
				default: false
			},
			/**
			 * 当前位置
			 */
			current: {
				type: Number,
				default: 0
			},
			/**
			 * 是否自动播放
			 */
			autoPlay: {
				type: Boolean,
				default: false
			},
			/**
			 * 自动播放之间的间距
			 */
			interval: {
				type: Number,
				default: 2000
			},
			/**
			 * 是否循环播放.
			 * circle的时候最少准备5个数据，不足5个时，请自行重复拼凑.
			 * 组件内不会帮忙检测数据
			 */
			circle: {
				type: Boolean,
				default: false
			},
			/**
			 * 内容是否处于swiper中间
			 */
			center: {
				type: Boolean,
				default: false
			},
			/**
			 * 缩放的尺度
			 */
			scale: {
				type: Number,
				default: 0.62
			},
			/**
			 * 动画周期
			 */
			duration: {
				type: Number,
				default: 300
			},
			/**
			 * 动画函数
			 */
			timingFunction: {
				type: String,
				default: 'ease-in-out'
			},
			/**
			 * 触发重新绑定动画
			 */
			updateTime: {
				type: Number,
				default: 0
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			}
		},
		provide() {
			return {
				nSwiper: this
			}
		},
		computed: {
			leftPx() {
				return getPx(this.left)
			},
			rightPx() {
				return getPx(this.right)
			},
			spacePx() {
				return getPx(this.space)
			},
			widthPx() {
				return getPx(this.width)
			},
			heightPx() {
				return getPx(this.height)
			},
			itemWidthPx() {
				return getPx(this.itemWidth)
			},
			itemHeightPx() {
				return getPx(this.itemHeight)
			},
			mrStyle() {
				return `width:${this.widthPx}px;height:${this.heightPx}px;`
			}
		},
		data() {
			return {
				children: [],
				// 内部的current记录，不依赖外部设置current
				inCurrent: 0,
				// 是否处于自动调整阶段.自动调整阶段，手势无效
				inMoving: false
			}
		},
		created() {
			this.children = []
		},
		mounted() {
			if (this.children.length > 0) {
				if (this.circle) {
					this.toAdjust(0, 1000, true)
					return
				}
				this.toAdjust()
			}
		},
		watch: {
			updateTime() {
				if (this.circle) {
					this.toAdjust(0, 1000, true)
					return
				}
				this.toAdjust()
			},
			inMoving(newV) {
				if (!newV && this.autoPlay && this.circle) {
					this.playTimer && clearInterval(this.playTimer)
					this.playTimer = setInterval(()=>{
						this.toAdjust(-50, 40)
					}, this.interval)
				}
			}
		},
		methods: {
			toAdjust(x=0, time=1000, init) {
				const length = this.children.length
				if (length === 0) return;
				this.inMoving = true
				this.children.forEach(val => {
					val.toAdjust(x, time, init)
				})
			},
			onPan(e) {
				if (this.inMoving) return;
				this.playTimer && clearInterval(this.playTimer)
				this.playTimer = null
				const that = this
				this.inMoving = true
				const props = []
				const current = this.inCurrent
				this.children.forEach(val => {
					props.push({
						element: val.$refs['n-swiper-v-item'].ref,
						property: 'transform.scale', //动画属性
						expression: val.getScaleExp(current)  // `${exp}`
					})
					props.push({
						element: val.$refs['n-swiper-v-item'].ref,
						property: 'transform.translateY', //动画属性
						expression: val.getExp(current)  // `x>=0?min(x, ${maxX}):max(x, -${maxX})`
					})
				})
				const startTime = Date.now()
				const bind = bindingX.bind({
				    eventType: 'pan',
				    anchor: this.$refs['n-swiper-v'].ref,
				    props: props
				}, (state)=>{
					// console.log(state)
					const endTime = Date.now()
					if (state.state == 'end') {
						that.toAdjust(state.deltaY, endTime - startTime)
						bindingX.unbind({
								eventType: 'pan',
								token: that.bindToken
							});
						that.bindToken = 0;
					}
				})
				this.bindToken = bind.token
			}
		},
		beforeDestroy() {
			if (this.bindToken) {
				bindingX.unbind({
						eventType: 'pan',
						token: this.bindToken
					});
				this.bindToken = 0;
			}
		}
	}
</script>

<style>
</style>
