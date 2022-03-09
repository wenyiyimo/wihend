<template>
	<view :class="['n-flex-row', 'n-align-'+align, 'n-justify-center', 'n-overflow-hidden', 'n-position-relative']" :style="boxStyle">
		<view :class="['n-bg-'+bgType]" :style="'width:'+width+'rpx;height:'+height+'rpx;'+barStyle">
			<view ref="n-bar" :class="['n-bg-'+activeBgType]" :style="'height:'+height+'rpx;'+activeBarStyle+barAni"></view>
		</view>
		<view ref="bar1" class="n-position-absolute" :style="indicatorStyle+ind1Ani" @touchstart="toPan" @touchmove="onMove" @touchend="onEnd" @touchcancel="onCancel">
			<slot>
				<view class="n-bg-inverse n-border-all" style="width: 54rpx;height: 54rpx;border-radius: 54rpx;"></view>
			</slot>
		</view>
		<view v-if="range" ref="bar2" class="n-position-absolute" :style="indicator2Style+ind2Ani" @touchstart="toPan2" @touchmove="onMove2" @touchend="onEnd2" @touchcancel="onCancel2">
			<slot name="other">
				<view class="n-bg-inverse n-border-all" style="width: 54rpx;height: 54rpx;border-radius: 54rpx;"></view>
			</slot>
		</view>
	</view>
</template>

<script>
	import {getPlatform, getPx} from '../utils/system.js'
	import {getTouchPoint} from '../utils/element.js'
	// #ifdef APP-NVUE
	let iosHack1 = null
	let iosHack2 = null
	const animation = uni.requireNativePlugin('animation');
	const bindingX = uni.requireNativePlugin('bindingx');
	// #endif
	
	export default {
		name: 'n-slider-bar',
		props: {
			/**
			 * 当前左侧值
			 */
			value: {
				type: Number,
				default: 0
			},
			/**
			 * 当前右侧值
			 */
			value2: {
				type: Number,
				default: 0
			},
			/**
			 * 最小值
			 */
			min: {
				type: Number,
				default: 0
			},
			/**
			 * 最大值
			 */
			max: {
				type: Number,
				default: 10
			},
			/**
			 * 是否区间
			 */
			range: {
				type: Boolean,
				default: false
			},
			/**
			 * bar的宽度.rpx
			 */
			width: {
				type: Number,
				default: 520
			},
			/**
			 * bar的高度.rpx
			 */
			height: {
				type: Number,
				default: 4
			},
			/**
			 * align-items的主题配置
			 */
			align: {
				type: String,
				default: 'center'
			},
			/**
			 * 拖动过程中的通信时间间隔
			 */
			duration: {
				type: Number,
				default: 20
			},
			/**
			 * 松开手指后是否修正数据
			 */
			lastAdjust: {
				type: Boolean,
				default: true
			},
			/**
			 * 
			 */
			bgType: {
				type: String,
				default: 'middle'
			},
			activeBgType: {
				type: String,
				default: 'primary'
			},
			boxStyle: {
				type: String,
				default: ''
			},
			barStyle: {
				type: String,
				default: ''
			},
			activeBarStyle: {
				type: String,
				default: ''
			},
			indicatorStyle: {
				type: String,
				default: 'left:0;top:0;'
			},
			indicator2Style: {
				type: String,
				default: 'left:0;top:0;'
			}
		},
		data() {
			return {
				inValue: 0,
				inValue2: 10,
				inMoving: false,
				ind1Style: '',
				ind2Style: '',
				initTimer: null,
				x1: 0,
				x2: 0,
				ind1Ani: '',
				ind2Ani: '',
				barAni: ''
			}
		},
		computed: {
			widthPx() {
				return getPx(this.width)
			}
		},
		watch: {
			value(newV) {
				if (this.inMoving) return;
				if (newV == this.inValue) return;
				this.inValue = newV
				this.initTimer && clearTimeout(this.initTimer)
				this.initTimer = null
				this.toInit()
			},
			value2(newV) {
				if (this.inMoving) return;
				if (newV == this.inValue2) return;
				this.inValue2 = newV
				this.initTimer && clearTimeout(this.initTimer)
				this.initTimer = null
				this.toInit()
			}
		},
		methods: {
			toPan(e) {
				if (this.inMoving) return;
				this.time = Date.now()
				this.inMoving = true
				this.start = getTouchPoint(e)
				// #ifdef APP-NVUE
				const barRef = this.$refs['bar1'].ref
				const props = [{
					element: barRef,
					property: 'transform.translateX',
					expression: `min(${this.widthPx}, max(x+${this.x1}, 0))`
				}, {
					element: this.$refs['n-bar'].ref,
					property: 'width',
					expression: this.range ? `${this.x2} - min(${this.widthPx}, max(x+${this.x1}, 0))` : `min(${this.widthPx}, max(x+${this.x1}, 0))`
				}]
				if (this.range) {
					props.push({
						element: this.$refs['n-bar'].ref,
						property: 'transform.translateX',
						expression: `min(${this.widthPx}, max(x+${this.x1}, 0))`
					})
				}
				const that = this
				const bind = bindingX.bind({
					eventType: 'pan',
					anchor: barRef,
					props: props
				}, e => {
					if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {
						that.x1 = Math.min(that.widthPx, Math.max(e.deltaX+that.x1, 0)) // that.x1 + e.deltaX
						that.unbind()
						that.toEmit(1, that.x1, true)
					}
				})
				this.bindToken = bind.token
				// #endif
			},
			toPan2(e) {
				if (this.inMoving) return;
				this.time = Date.now()
				this.inMoving = true
				this.start2 = getTouchPoint(e)
				// #ifdef APP-NVUE
				const barRef = this.$refs['bar2'].ref
				const props = [{
					element: barRef,
					property: 'transform.translateX',
					expression: `min(${this.widthPx}, max(x+${this.x2}, 0))`
				}, {
					element: this.$refs['n-bar'].ref,
					property: 'width',
					expression: `min(${this.widthPx}, max(x+${this.x2}, 0)) - ${this.x1}`
				}]
				const that = this
				const bind = bindingX.bind({
					eventType: 'pan',
					anchor: barRef,
					props: props
				}, e => {
					if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {
						that.x2 = Math.min(that.widthPx, Math.max(e.deltaX+that.x2, 0)) // that.x2 + e.deltaX
						that.unbind()
						that.toEmit(2, that.x2, true)
					}
				})
				this.bindToken2 = bind.token
				// #endif
			},
			onMove(e) {
				const now = getTouchPoint(e)
				// #ifdef APP-NVUE
				const offset = now.sX - this.start.sX
				// #endif
				// #ifndef APP-NVUE
				const offset = now.x - this.start.x
				// #endif
				
				// #ifndef APP-NVUE
				this.ind1Ani = `transform:translateX(${Math.min(this.widthPx, Math.max(this.x1 + offset, 0))}px);`
				let barA = `width:${this.range ? this.x2 - Math.min(this.widthPx, Math.max(offset+this.x1, 0)) : Math.min(this.widthPx, Math.max(offset+this.x1, 0))}px;`
				if (this.range) {
					barA += `transform:translateX(${Math.min(this.widthPx, Math.max(offset+this.x1, 0))}px);`
				}
				this.barAni = barA
				// #endif
				const t = Date.now()
				let v1 = this.min + (this.max - this.min) * (this.x1 + offset) / this.widthPx
				if (t - this.time >= this.duration) {
					this.time = Date.now()
					this.toEmit(1, this.x1 + offset)
				}
			},
			onMove2(e) {
				const now = getTouchPoint(e)
				// #ifdef APP-NVUE
				const offset = now.sX - this.start2.sX
				// #endif
				// #ifndef APP-NVUE
				const offset = now.x - this.start2.x
				// #endif
				
				// #ifndef APP-NVUE
				this.ind2Ani = `transform:translateX(${Math.min(this.widthPx, Math.max(offset+this.x2, 0))}px);`
				this.barAni = this.barAni + `width:${Math.min(this.widthPx, Math.max(offset+this.x2, 0)) - this.x1}px;`
				// #endif
				const t = Date.now()
				let v2 = this.min + (this.max - this.min) * (this.x2 + offset) / this.widthPx
				if (t - this.time >= this.duration) {
					this.time = Date.now()
					this.toEmit(2, this.x2 + offset)
				}
			},
			onEnd(e) {
				// #ifndef APP-NVUE
				const now = getTouchPoint(e)
				const offset = now.x - this.start.x
				this.inMoving = false
				this.x1 = Math.min(this.widthPx, Math.max(offset+this.x1, 0))
				this.toEmit(1, this.x1, true)
				// #endif
			},
			onEnd2(e) {
				// #ifndef APP-NVUE
				this.inMoving = false
				const now = getTouchPoint(e)
				const offset = now.x - this.start2.x
				this.x2 = Math.min(this.widthPx, Math.max(offset+this.x2, 0))
				this.toEmit(2, this.x2, true)
				// #endif
			},
			onCancel(e) {
				// #ifndef APP-NVUE
				this.onEnd(e)
				// #endif
			},
			onCancel2(e) {
				// #ifndef APP-NVUE
				this.onEnd2(e)
				// #endif
			},
			toEmit(i, x, end) {
				// 请自行修正数据的可靠性
				let v = this.min + (this.max - this.min) * x / this.widthPx
				if (v <= this.min) {
					v = this.min
				} else if (v >= this.max) {
					v = this.max
				} else {
					v = Math.round(v)
				}
				if (end && this.lastAdjust) {
					if (i == 1) {
						this.inValue = v
					} else {
						this.inValue2 = v
					}
					this.toInit()
				}
				if ((end && this.lastAdjust) || !end) {
					if (this.range) {
						this.$emit("change"+i, v)
						return
					}
					this.$emit("change", v)
				}
			},
			unbind() {
				this.inMoving = false
				// #ifdef APP-NVUE
				this.bindToken && bindingX.unbind({
					token: this.bindToken,
					eventType: 'pan'
				})
				this.bindToken = null
				this.bindToken2 && bindingX.unbind({
					token: this.bindToken2,
					eventType: 'pan'
				})
				this.bindToken2 = null
				// #endif
			},
			toInit() {
				const x1 = this.widthPx * (this.inValue - this.min) / (this.max - this.min)
				let x2 = 0
				if (this.range) {
					x2 = this.widthPx * (this.inValue2 - this.min) / (this.max - this.min)
				}
				this.x1 = x1
				this.x2 = x2
				// #ifdef APP-NVUE
				animation.transition(this.$refs['n-bar'], {
					styles: {width: `${this.range?(x2-x1):x1}px`, transform: `translateX(${this.range?x1:0}px)`},
					duration: 0,
					delay: 0
				}, ()=>{
					this.initTimer && clearTimeout(this.initTimer)
					this.initTimer = null
				})
				animation.transition(this.$refs['bar1'], {
					styles: {transform: `translateX(${x1}px)`},
					duration: 0,
					delay: 0
				})
				if (this.range) {
					animation.transition(this.$refs['bar2'], {
						styles: {transform: `translateX(${x2}px)`},
						duration: 0,
						delay: 0
					})
				}
				// #endif
				// #ifndef APP-NVUE
				this.barAni = `width:${this.range?(x2-x1):x1}px;transform:translateX(${this.range?x1:0}px);`
				this.ind1Ani = `transform:translateX(${x1}px);`
				this.ind2Ani = `transform:translateX(${x2}px);`
				// #endif
			}
		},
		created() {
			this.inValue = this.value
			this.inValue2 = this.value2
			this.inMoving = false
			// #ifndef APP-NVUE
			this.toInit()
			// #endif
			// #ifdef APP-NVUE
			this.initTimer = setTimeout(()=>{
				this.toInit()
			}, 10)
			this.platform = getPlatform()
			if (this.platform === 'ios') {
				setTimeout(()=>{
					iosHack1 = bindingX.bind({
						eventType: 'pan',
						anchor: this.$refs['bar1'].ref,
						props: [
							{
								element: this.$refs['bar1'].ref,
								property: 'transform.translateX',
								expression: 'x+0'
							}
						]
					})
					if (this.range) {
						iosHack2 = bindingX.bind({
							eventType: 'pan',
							anchor: this.$refs['bar2'].ref,
							props: [
								{
									element: this.$refs['bar2'].ref,
									property: 'transform.translateX',
									expression: 'x+0'
								}
							]
						})
					}
				}, 10)
			}
			// #endif
		},
		beforeDestroy() {
			// #ifdef APP-NVUE
			this.bindToken && bindingX.unbind({
				token: this.bindToken,
				eventType: 'pan'
			})
			this.bindToken2 && bindingX.unbind({
				token: this.bindToken2,
				eventType: 'pan'
			})
			if (iosHack1) {
				bindingX.unbind({
				    token: iosHack1.token,
				    eventType: 'pan'
				})
			}
			if (iosHack2) {
				bindingX.unbind({
				    token: iosHack2.token,
				    eventType: 'pan'
				})
			}
			// #endif
			this.initTimer && clearTimeout(this.initTimer)
		}
	}
</script>

<style>
</style>
