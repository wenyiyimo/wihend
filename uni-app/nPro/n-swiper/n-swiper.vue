<template>
	<view ref="n-swiper" class="n-position-relative n-overflow-hidden" :style="mrStyle+boxStyle" @horizontalpan="onPan">
		<slot></slot>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const bindingX = uni.requireNativePlugin("bindingx")
	// #endif
	
	import {getPx} from '../utils/system.js'
	
	export default {
		name: 'n-swiper',
		props: {
			/**
			 * 关联外部的手势.目前只与swiper自己本身关联
			 */
			linkage: {
				type: String,
				default: ''
			},
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
			 * 当前位置.circular的时候不支持改变
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
			 * circular的时候最少准备5个数据，不足5个时，请自行重复拼凑.
			 * 组件内不会帮忙检测数据
			 */
			circular: {
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
			 * 拉动基础距离的多少比例算下一个
			 */
			percent: {
				type: Number,
				default: 0.4
			},
			/**
			 * 动画周期
			 */
			duration: {
				type: Number,
				default: 300
			},
			/**
			 * 初始化位置的时候时候有动画效果
			 */
			silence: {
				type: Boolean,
				default: false
			},
			/**
			 * 拉动的基准宽度
			 * 默认是itemWidth
			 */
			baseWidth: {
				type: String,
				default: '0'
			},
			/**
			 * 最大拉动倍数
			 * baseWidth的倍数
			 * 默认1.5倍
			 */
			times: {
				type: Number,
				default: 1.5
			},
			/**
			 * 是否使用线性的跟手拉动
			 * 默认使用线性
			 */
			linear: {
				type: Boolean,
				default: true
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
			},
			// 滑动多少距离算一个完整的item
			baseWidthPx() {
				if (!this.baseWidth || this.baseWidth == 0) {
					return this.itemWidthPx + this.spacePx
				}
				return getPx(this.baseWidth)
			},
			// 单次滑动最大可滑动的距离，防止出现大规模的空白
			maxX() {
				return this.baseWidthPx * this.times
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
				if (this.current >= this.children.length) {
					this.inCurrent = this.children.length - 1
				} else {
					this.inCurrent = this.current
				}
				if (this.circular) {
					this.toAdjust(0, 1000, true)
					return
				}
				// this.toAdjust()
				this.toPosition(this.inCurrent, this.current, this.silence)
			}
		},
		watch: {
			updateTime() {
				if (this.circular) {
					this.toAdjust(0, 1000, true)
					return
				}
				// this.toAdjust()
				this.toPosition(this.inCurrent, this.current, this.silence)
			},
			inMoving(newV) {
				if (!newV && this.autoPlay && this.circular) {
					this.playTimer && clearInterval(this.playTimer)
					this.playTimer = setInterval(()=>{
						this.toAdjust(-50, 40)
					}, this.interval)
				}
			},
			current(newV) {
				if (this.children.length == 0) return
				if (newV != this.inCurrent && !this.circular) {
					this.toPosition(this.inCurrent, newV)
				}
			}
		},
		methods: {
			/**
			 * 在某些情况下可能被锁住，可以用这个来解锁
			 * 比如：iOS下bindingx可能存在bug，无法回调，这个时候就会锁住
			 * 我们可以考虑在外面加一个条件来触发解锁。比如双swiper的时候，外面的swiper触发来就解锁
			 */
			unLock() {
				this.inMoving = false
			},
			toPrev() {
				this.toAdjust(50, 40)
			},
			toNext() {
				this.toAdjust(-50, 40)
			},
			toPosition(current, dest, silence=false) {
				const length = this.children.length
				if (length === 0) return;
				let _dest = dest
				if (dest >= length) {
					_dest = length - 1
				}
				this.inMoving = true
				this.children.forEach(val => {
					val.toPosition(current, _dest, silence)
				})
			},
			toAdjust(x=0, time=1000, init) {
				const length = this.children.length
				if (length === 0) return;
				if (this.inCurrent >= length) {
					this.inCurrent = length - 1
				}
				this.inMoving = true
				this.children.forEach(val => {
					val.toAdjust(x, time, init)
				})
			},
			onPan(e) {
				if (this.inMoving || this.lock) return;
				this.playTimer && clearInterval(this.playTimer)
				this.playTimer = null
				const that = this
				this.inMoving = true
				let props = []
				const current = this.inCurrent
				this.children.forEach(val => {
					props.push({
						element: val.$refs['n-swiper-item'].ref,
						property: 'transform.scale', //动画属性
						expression: val.getScaleExp(current)  // `${exp}`
					})
					props.push({
						element: val.$refs['n-swiper-item'].ref,
						property: 'transform.translateX', //动画属性
						expression: val.getExp(current)  // `x>=0?min(x, ${maxX}):max(x, -${maxX})`
					})
				})
				let linkageIns = null
				let factor = 1
				if (this.linkage) {
					linkageIns = this.toSearchParent(this.$parent)
					if (linkageIns) {
						factor = linkageIns.itemWidthPx / this.itemWidthPx
						props = props.concat(this.toGetLinkageProps(linkageIns, factor))
					}
					/*
					linkageIns = this.$parent.$refs[this.linkage]
					if (!linkageIns) {
						// 仅允许swiper外面再包一层
						linkageIns = this.$parent.$parent.$refs[this.linkage]
					}
					factor = linkageIns.itemWidthPx / this.itemWidthPx
					props = props.concat(this.toGetLinkageProps(linkageIns, factor))
					*/
				}
				const startTime = Date.now()
				const bind = bindingX.bind({
				    eventType: 'pan',
				    anchor: this.$refs['n-swiper'].ref,
				    props: props
				}, (state)=>{
					// console.log(state)
					const endTime = Date.now()
					if (state.state == 'end') {
						that.toAdjust(state.deltaX, endTime - startTime)
						if (that.linkage) {
							linkageIns.toAdjust(state.deltaX*factor, endTime - startTime)
						}
						bindingX.unbind({
								eventType: 'pan',
								token: that.bindToken
							});
						that.bindToken = 0;
					}
				})
				this.bindToken = bind.token
			},
			toGetLinkageProps(ins, factor) {
				if (ins.inMoving || ins.lock) return;
				ins.playTimer && clearInterval(ins.playTimer)
				ins.playTimer = null
				const that = ins
				ins.inMoving = true
				const props = []
				const current = ins.inCurrent
				ins.children.forEach(val => {
					props.push({
						element: val.$refs['n-swiper-item'].ref,
						property: 'transform.scale', //动画属性
						expression: val.getScaleExp(current, factor)  // `${exp}`
					})
					props.push({
						element: val.$refs['n-swiper-item'].ref,
						property: 'transform.translateX', //动画属性
						expression: val.getExp(current, factor)  // `x>=0?min(x, ${maxX}):max(x, -${maxX})`
					})
				})
				return props
			},
			toSearchParent(parent) {
				let ins = parent.$refs[this.linkage]
				if (ins) {
					return ins
				} else {
					const p = parent.$parent
					if (!p) return;
					return this.toSearchParent(p)
				}
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
