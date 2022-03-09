<template>
	<view :class="['n-bg-'+bgType, 'n-border-'+border, 'n-radius-'+radius, 'n-position-relative', 'n-overflow-hidden', 'coll-box']" :style="aniStyle+boxStyle">
		<!-- #ifdef APP-NVUE -->
		<view id="n-coll-body" ref="n-coll-body" class="n-position-absolute" :style="'left:0;top:'+th+'px;'+bodyStyle">
			<slot name="body"></slot>
		</view>
		<view id="n-coll-head" ref="n-coll-head" class="n-position-relative" :style="headStyle" @click="toHeadClick">
			<slot name="head"></slot>
			<n-icon id="n-coll-icon" ref="n-coll-icon" :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="'position:absolute;'+iconBoxStyle"></n-icon>
		</view>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<view id="n-coll-head" ref="n-coll-head" class="n-position-relative" :style="'z-index:2;'+headStyle" @click="toHeadClick">
			<slot name="head"></slot>
			<n-icon id="n-coll-icon" ref="n-coll-icon" :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="iconAniStyle+'position:absolute;'+iconBoxStyle"></n-icon>
		</view>
		<view id="n-coll-body" ref="n-coll-body" :style="'z-index:1;'+bodyAniStyle+bodyStyle">
			<slot name="body"></slot>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom');
	const animation = uni.requireNativePlugin('animation');
	// #endif
	
	import { getElSize } from '../utils/element.js';
	import { getPx } from '../utils/system.js';
	
	/**
	 * collapse
	 * @description 展开/收起
	 * @property {String} value 唯一值
	 * @property {String} current 当前值
	 * @property {Number} duration 动画周期
	 * @property {String} timingFunction 动画效果
	 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
	 * @property {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
	 * @property {String} radius = [ss|s|base|l|ll|none] 圆角主题
	 * @property {String} bodyHeight 收展区的高度。不设置会自动获取
	 * @property {String} boxStyle 外层样式
	 * @property {String} headStyle head样式
	 * @property {String} bodyStyle body样式
	 */
	export default {
		name: 'n-collapse',
		props: {
			/**
			 * 唯一值，用来判断是否收起自己
			 */
			value: {
				type: String,
				default: ''
			},
			/**
			 * 当前值
			 */
			current: {
				type: String,
				default: ''
			},
			/**
			 * 动画周期
			 */
			duration: {
				type: Number,
				default: 300
			},
			/**
			 * 动画效果
			 */
			timingFunction: {
				type: String,
				default: 'ease'
			},
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * 边框主题
			 */
			border: {
				type: String,
				default: 'all'
			},
			/**
			 * 圆角主题
			 */
			radius: {
				type: String,
				default: ''
			},
			/**
			 * 是否自动内部响应
			 */
			auto: {
				type: Boolean,
				default: false
			},
			/**
			 * 头部高度。不设置会自动获取
			 */
			headHeight: {
				type: String,
				default: null
			},
			/**
			 * 收展区的高度。不设置会自动获取
			 */
			bodyHeight: {
				type: String,
				default: 'auto'
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * head样式
			 */
			headStyle: {
				type: String,
				default: ''
			},
			/**
			 * body样式
			 */
			bodyStyle: {
				type: String,
				default: ''
			},
			/**
			 * 默认的动画图标
			 */
			icon: {
				type: String,
				default: ''
			},
			/**
			 * 图标颜色主题
			 */
			iconType: {
				type: String,
				default: 'third'
			},
			/**
			 * 图标尺寸主题
			 */
			iconSize: {
				type: String,
				default: 'base'
			},
			/**
			 * 图标样式
			 */
			iconStyle: {
				type: String,
				default: ''
			},
			/**
			 * 图标外层样式
			 */
			iconBoxStyle: {
				type: String,
				default: 'right:32rpx;'
			}
		},
		data() {
			return {
				isOpen: false,
				tch: 0,
				bch: 0,
				aniStyle: '',
				iconAniStyle: '',
				bodyAniStyle: ''
			}
		},
		computed: {
			th() {
				if (this.headHeight == 'auto') {
					return this.tch
				}
				if (this.headHeight) {
					return getPx(this.headHeight)
				}
				return this.tch
			},
			bh() {
				if (this.bodyHeight == 'auto') {
					return this.bch
				}
				if (this.bodyHeight) {
					return getPx(this.bodyHeight)
				}
				return this.bch
			}
		},
		watch: {
			current(newV) {
				newV === this.value ? this.open() : this.close()
			}
		},
		mounted() {
			// #ifdef APP-NVUE
			setTimeout(() => {
				this.init()
			}, 50)
			// #endif
			// #ifndef APP-NVUE
			this.init()
			this.aniStyle = `transition-duration: ${this.duration}ms;transition-timing-function: ${this.timingFunction};`
			// #endif
		},
		methods: {
			open() {
				this.isOpen = true
				// #ifdef APP-NVUE
				this.aniStyle = `transition-duration: ${this.duration}ms;transition-timing-function: ${this.timingFunction};height:${this.bh+this.th}px;`
				// #endif
				this.toToggle(true)
			},
			close() {
				this.isOpen = false
				// #ifdef APP-NVUE
				if (!this.tch && (!this.headHeight||this.headHeight=='auto')) {
					this.aniStyle = `transition-duration: ${this.duration}ms;transition-timing-function: ${this.timingFunction};`
				} else {
					this.aniStyle = `transition-duration: ${this.duration}ms;transition-timing-function: ${this.timingFunction};height:${this.th}px;`
				}
				// #endif
				this.toToggle(false)
			},
			toHeadClick() {
				this.$emit("toggle", this.isOpen)
				if (this.auto) {
					this.isOpen ? this.close() : this.open()
				}
			},
			async init() {
				// #ifdef APP-NVUE
				if (!this.tch && (!this.headHeight||this.headHeight=='auto')) {
					try {
						const npxorp = await getElSize('n-coll-head', this)
						this.tch = npxorp.height
					} catch (e) {
						//TODO handle the exception
						return;
					}
				}
				if (!this.bch && (!this.bodyHeight||this.bodyHeight=='auto')) {
					try {
						const npxorp = await getElSize('n-coll-body', this)
						this.bch = npxorp.height;
					} catch (e) {
						//TODO handle the exception
						return;
					}
				}
				// #endif
				this.current === this.value && this.value ? this.open() : this.close()
			},
			async toToggle(open) {
				// #ifndef APP-NVUE
				let style = `transition-property:all;transform:${open?'translateY(0%)':'translateY(-100%)'};transition-duration:${this.duration}ms;transition-timing-function:${this.timingFunction};`
				this.bodyAniStyle = style + `height:${open?this.bodyHeight:'0'};`
				// #endif
				// #ifdef APP-NVUE
				const bodyEl = this.$refs['n-coll-body'];
				const that = this;
				animation.transition(
					bodyEl,
					{
						styles: {
							transform: open ? 'translateY(0%)' : 'translateY(-100%)'
						},
						duration: this.duration,
						delay: 0,
						timingFunction: this.timingFunction
					},
					() => {
					}
				)
				const iconEl = this.$refs['n-coll-icon']
				animation.transition(
					iconEl,
					{
						styles: {
							transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
						},
						duration: this.duration,
						delay: 0,
						timingFunction: this.timingFunction
					},
					() => {
					}
				)
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.coll {
		&-box {
			transition-property: height;
			transition-duration: 300ms;
			transition-timing-function: ease;
		}
	}
</style>
