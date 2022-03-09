<template>
	<view :class="['n-overflow-hidden', 'n-flex-row', 'n-align-center', 'n-wrap-nowrap', 'n-height-'+height]" :style="boxStyle">
		<slot name="left"></slot>
		<view class="n-flex-row n-align-center n-flex-1 n-wrap-nowrap">
			<!-- #ifndef APP-NVUE -->
			<view :class="['rl-text', rolling&&'rl-rolling']" :style="rolling?mrRollingStyle:''">
				<slot>
					<text :class="['n-lines-nowrap', 'n-color-'+textType, 'n-size-'+textSize]" :style="textStyle">{{text}}</text>
				</slot>
			</view>
			<!-- #endif -->
			<!-- #ifdef APP-NVUE -->
			<view ref="rolling-text">
				<slot>
					<text :class="['n-lines-nowrap', 'n-color-'+textType, 'n-size-'+textSize]" :style="textStyle">{{text}}</text>
				</slot>
			</view>
			<!-- #endif -->
		</view>
		<slot name="right"></slot>
	</view>
</template>

<script>
	import {animate} from '../utils/animate.js'
	
	/**
	 * rolling
	 * @description 滚动公告
	 * @property {Number} times 滚动的次数。默认是0，表示无限滚动
	 * @property {Boolean} auto = [true|false] 是否开启自动滚动
	 * @property {String} text 公告内容
	 * @property {String} textType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 内容的颜色主题
	 * @property {String} textSize = [ss|s|base|l|ll] 内容的尺寸主题
	 * @property {String} textStyle 内容的样式
	 * @property {String} height = [ss|s|base|l|ll] 高度主题
	 * @property {Number} duration 滚动周期
	 * @property {String} boxStyle 外层样式
	 */
	export default {
		name: 'n-rolling',
		props: {
			/**
			 * 滚动的次数。默认是0，表示无限滚动
			 */
			times: {
				type: Number,
				default: 0
			},
			/**
			 * 是否开启自动滚动
			 */
			auto: {
				type: Boolean,
				default: false
			},
			/**
			 * 公告内容
			 */
			text: {
				type: String,
				default: ''
			},
			/**
			 * 内容的颜色主题
			 */
			textType: {
				type: String,
				default: 'error'
			},
			/**
			 * 内容的尺寸主题
			 */
			textSize: {
				type: String,
				default: 'base'
			},
			/**
			 * 内容的样式
			 */
			textStyle: {
				type: String,
				default: ''
			},
			/**
			 * 高度主题
			 */
			height: {
				type: String,
				default: 'base'
			},
			/**
			 * 动画周期
			 */
			duration: {
				type: Number,
				default: 8000
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				rolling: false,
				inTime: 0
			}
		},
		mounted() {
			// #ifdef APP-NVUE
			setTimeout(()=>{
				this.auto && this.start()
			}, 0)
			// #endif
			// #ifndef APP-NVUE
			this.auto && this.start()
			// #endif
		},
		computed: {
			// #ifndef APP-NVUE
			mrRollingStyle() {
				return `animation-duration: ${this.duration}ms;`
			}
			// #endif
		},
		methods: {
			start() {
				this.inTime = 0
				this.rolling = true
				// #ifdef APP-NVUE
				this.toStart()
				// #endif
				// #ifndef APP-NVUE
				this.timer && clearInterval(this.timer)
				this.timer = setInterval(()=>{
					this.inTime += 1
					if (this.inTime >= this.times && this.times > 0) {
						this.rolling = false
					}
				}, this.duration)
				// #endif
			},
			stop() {
				this.rolling = false
			},
			// #ifdef APP-NVUE
			toStart() {
				if (!this.rolling) return;
				if (this.inTime >= this.times && this.times > 0) return;
				const that = this
				const el = this.$refs['rolling-text']
				animate(el, {
					styles: {
						transform: 'translateX(100%)'
					},
					duration: 0
				}).then(()=>{
					animate(el, {
						styles: {
							transform: 'translateX(-100%)'
						},
						duration: that.duration,
						timingFunction: 'linear'
					}).then(()=>{
						that.inTime += 1
						that.toStart()
					}).catch(err=>{
						console.log(err)
					})
				}).catch(err=>{
					console.log(err)
				})
			}
			// #endif
		},
		beforeDestroy() {
			this.timer && clearInterval(this.timer)
		}
	}
</script>

<style lang="scss" scoped>
	.rl {
		/* #ifndef APP-NVUE */
		&-text {
			transform: translateX(100%);
		}
		&-rolling {
			animation: rl-rolling 10000ms linear infinite;
		}
		/* #endif */
	}
	/* #ifndef APP-NVUE */
	@keyframes rl-rolling {
		0% {
			transform: translateX(100%);
		}
		100% {
			transform: translateX(-100%);
		}
	}
	/* #endif */
</style>
