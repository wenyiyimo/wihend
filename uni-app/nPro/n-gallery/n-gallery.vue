<template>
	<!-- #ifdef APP-NVUE -->
	<scroll-view v-if="platform=='ios'" ref="n-gallery" class="n-flex-row" :scroll-with-animation="true" :scroll-left="toLeft" :scroll-x="true" scroll-direction="horizontal" :show-scrollbar="false" @scrollend="ended" :style="mrBoxStyle">
		<slot></slot>
	</scroll-view>
	<!-- Android下 scroll-view 不支持使用bindingX。所以使用 scroller。但是没有scrollend事件，没有scroll-left属性 -->
	<scroller v-else ref="n-gallery" class="n-flex-row" :scroll-with-animation="true" scroll-direction="horizontal" :show-scrollbar="false" :style="mrBoxStyle" @scroll="onScroll">
		<view ref="n-gallery-left" style="width: 0;height: 0;"></view>
		<slot></slot>
	</scroller>
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
	<scroll-view>
		<slot></slot>
	</scroll-view>
	<!-- #endif -->
</template>

<script>
	/**
	 * 连续滚动的画廊，采用scroll-view实现。
	 * 特点：连续滚动；居中放大（中心点可变）
	 */
	// #ifdef APP-NVUE
	const bindingX = uni.requireNativePlugin('bindingx');
	const dom = uni.requireNativePlugin("dom")
	// #endif
	
	import { getPlatform, getPx, getRatio } from '../utils/system.js'
	
	export default {
		name: 'n-gallery',
		provide() {
			return {
				nGallery: this
			}
		},
		props: {
			/**
			 * scroll的宽度
			 */
			width: {
				type: String,
				default: '750rpx'
			},
			/**
			 * scroll的高度
			 */
			height: {
				type: String,
				default: '360rpx'
			},
			/**
			 * item的宽度
			 */
			widthScale: {
				type: Number,
				default: 0.7
			},
			/**
			 * item的高度
			 */
			heightScale: {
				type: Number,
				default: 0.8
			},
			/**
			 * 滚动时每一个item的scale影响因子
			 * 必须大于0，建议设置成0.5左右，根据需要自己修正，
			 * 影响最大移动距离，默认是0.5.也就是scale在√2/2-1-√2/2之间
			 * 值越大，scale越靠近1，区间越小；
			 * TODO: 低于0.5的时候item的初始化大小没有变
			 */
			scaleFactor: {
				type: Number,
				default: 0.5
			},
			/**
			 * item内容之间的间距
			 */
			space: {
				type: String,
				default: '0'
			},
			/**
			 * 左侧空白
			 */
			left: {
				type: String,
				default: '0'
			},
			/**
			 * 右侧空白
			 */
			right: {
				type: String,
				default: '0'
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 内容样式
			 */
			itemStyle: {
				type: String,
				default: ''
			},
			/**
			 * 改变这个值来开始新的gallery
			 */
			updateTime: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				platform: '',
				current: 0,
				toLeft: 0
			}
		},
		computed: {
			mrBoxStyle() {
				return this.boxStyle + `width:${this.widthPx}px;height:${this.heightPx}px;`
			},
			widthPx() {
				return getPx(this.width)
			},
			widthRpx() {
				if (this.width.indexOf('rpx') > 0 || this.width.indexOf('upx') > 0 || this.width.indexOf('px') < 0) {
					return parseInt(this.width)
				}
				return getRatio() * parseInt(this.width)
			},
			heightPx() {
				return getPx(this.height)
			},
			// 最大移动距离，计算范围是移动出屏幕前的距离
			// 实际上 maxApart 决定了scale的范围
			// 因为每一个item距离屏幕中线的距离是有限的
			maxApartPx() {
				return (this.widthPx + this.itemWidthPx) * (this.scaleFactor > 0 ? this.scaleFactor : 0.5)
			},
			maxApartRpx() {
				return (this.widthRpx + this.itemWidthRpx) * (this.scaleFactor > 0 ? this.scaleFactor : 0.5)
			},
			itemWidthPx() {
				return this.widthPx * this.widthScale
			},
			itemWidthRpx() {
				return this.widthRpx * this.widthScale
			},
			itemHeightPx() {
				return this.heightPx * this.heightScale
			},
			firstMargin() {
				// 为第一个元素增加margin
				const w = this.widthPx * (1- this.widthScale) * 0.5
				return `margin-left:${w}px;`
			},
			lastMargin() {
				// 为最后一个元素增加margin
				const w = this.widthPx * (1- this.widthScale) * 0.5
				return `margin-right:${w}px;`
			},
			mrItemStyle() {
				return this.itemStyle + `width:${this.itemWidthPx}px;height:${this.itemHeightPx}px;`
			}
		},
		created() {
			this.children = []
			this.platform = getPlatform()
		},
		watch: {
			updateTime() {
				this.initLayout()
			}
		},
		mounted() {
			this.initLayout(true)
		},
		methods: {
			initLayout(delay=false) {
				const that = this
				if (this.children.length === 0) return;
				// #ifdef APP-NVUE
				this.toInitItemsLayout()
				if (this.platform === 'ios' || !delay) {
					this.bindScroll()
					if (this.platform === 'ios') {
						this.toLeft = 1
					} else {
						dom.scrollToElement(this.$refs['n-gallery-left'], {offset: 1})
					}
					return
				}
				setTimeout(()=>{
					that.bindScroll()
				}, 50)
				setTimeout(()=>{
					// 初始化排版
					// that.toLeft = 1
					dom.scrollToElement(that.$refs['n-gallery-left'], {offset: 1})
				}, 60)
				// #endif
			},
			ended(e) {
				// Android下scroller没有scrollend事件，我们在scroll中模拟ended，返回内容是e.contentOffset.x
				// #ifdef APP-NVUE
				if (this.platform != 'ios') {
					const scrollX = Math.abs(e.contentOffset.x)
					// const scrollX = Math.abs(e.contentOffset.x)
					this.toCenterItem(scrollX)
					return
				}
				// #endif
				const scrollX = e.detail.contentOffset.x
				// const scrollX = Math.abs(e.contentOffset.x)
				this.toCenterItem(scrollX)
			},
			toInitItemsLayout() {
				for (const i in this.children) {
					const _child = this.children[i]
					_child.initLayout()
				}
			},
			// android下没有scrollend事件，只好使用scroll事件来做判断
			onScroll(e) {
				this.scrollTimer && clearTimeout(this.scrollTimer)
				this.scrollTimer = null
				this.scrollTimer = setTimeout(()=>{
					this.ended(e)
				}, 100)
			},
			// we must bind it in parent
			// 不然，一个个绑定的时候后面的会覆盖掉前面的
			bindScroll() {
				this.unbind()
				const _props = []
				for (const i in this.children) {
					const _child = this.children[i]
					// 注意：这个表达式里面，iOS下的x是rpx，但是在Android下却是px，很操蛋的东西
					// ios下对应scroll-view，Android下对应scroller
					let exp = `abs((${this.widthPx * 0.5 + _child.index * this.itemWidthPx} - (x + ${this.widthPx * 0.5})) / ${this.maxApartPx}) > 1 ? (${this.widthScale},${this.heightScale}) : abs(cos(abs((${this.widthPx * 0.5 + _child.index * this.itemWidthPx} - (x + ${this.widthPx * 0.5})) / ${this.maxApartPx})*(3.14/4)))`
					// #ifdef APP-NVUE
					if (this.platform === 'ios') {
						exp = `abs((${this.widthRpx * 0.5 + _child.index * this.itemWidthRpx} - (x + ${this.widthRpx * 0.5})) / ${this.maxApartRpx}) > 1 ? (${this.widthScale},${this.heightScale}) : abs(cos(abs((${this.widthRpx * 0.5 + _child.index * this.itemWidthRpx} - (x + ${this.widthRpx * 0.5})) / ${this.maxApartRpx})*(3.14/4)))`
					}
					// #endif
					_props.push({
						element: _child.$refs['n-gallery-item'].ref,
						property: 'transform.scale', //动画属性
						expression: exp
					})
				}
				const bind = bindingX.bind({
				    eventType:'scroll',
				    anchor: this.$refs['n-gallery'].ref,
				    props: _props
				}, (state)=>{
					// console.log(state)
				})
				this.bindToken = bind.token
			},
			toCenterItem(scrollX) {
				const number = Math.round(scrollX / this.itemWidthPx)
				const oldLeft = this.toLeft
				const newLeft = number * this.itemWidthPx
				// 很小时允许不滚动，防止抖动
				if (Math.abs(newLeft - scrollX) <= 2) {
					return
				}
				// #ifdef APP-NVUE
				if (this.platform != 'ios') {
					dom.scrollToElement(this.$refs['n-gallery-left'], {offset: newLeft})
					return
				}
				// #endif
				if (oldLeft != newLeft) {
					this.toLeft = newLeft
					return
				}
				// 相等的时候设置不会引起滚动,需要特殊处理
				if (oldLeft === newLeft) {
					this.toLeft = 0;
					this.toLeft = newLeft + 0.1;
					// Tag:
					// 中间不断滑动又停止又滑动，快速动作时会引起死循环，一直在end
					// 突然停住的时候会死循环
					// solve the bug via a timeout
					this.endTimer && clearTimeout(this.endTimer)
					this.endTimer = setTimeout(()=>{
						this.toLeft = newLeft
						this.endTimer && clearTimeout(this.endTimer)
						this.endTimer = null
					}, 0)
				}
			},
			unbind() {
				if (this.bindToken) {
					bindingX.unbind({
							eventType: 'scroll',
							token: this.bindToken
						});
					this.bindToken = 0;
				}
			}
		},
		beforeDestroy() {
			this.unbind()
		}
	}
</script>

<style lang="scss" scoped>
</style>
