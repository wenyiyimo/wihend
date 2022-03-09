<template>
	<view ref="n-swiper-v-item" :class="['n-position-absolute', 'n-bg-'+bgType, 'n-border-'+border, 'n-radius-'+radius, 'n-flex-'+flex, 'n-align-'+align, 'n-justify-'+justify]" :style="mrStyle+boxStyle">
		<slot></slot>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin("animation")
	// #endif
	
	export default {
		name: 'n-swiper-v-item',
		inject: ['nSwiper'],
		props: {
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * 边框主题
			 */
			border: {
				type: String,
				default: ''
			},
			/**
			 * 圆角主题
			 */
			radius: {
				type: String,
				default: ''
			},
			/**
			 * 布局方式的主题
			 */
			flex: {
				type: String,
				default: 'column'
			},
			/**
			 * justify-content的主题
			 */
			justify: {
				type: String,
				default: 'start'
			},
			/**
			 * align-items的主题
			 */
			align: {
				type: String,
				default: 'start'
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 内容项样式
			 */
			itemStyle: {
				type: String,
				default: ''
			}
		},
		created() {
			this.index = this.nSwiper.children.length
			this.nSwiper.children.push(this)
			let style = ''
			let left = this.nSwiper.leftPx + this.nSwiper.spacePx * this.index + this.nSwiper.itemHeightPx * this.index
			if (this.nSwiper.center) {
				left = (this.nSwiper.heightPx - this.nSwiper.itemHeightPx)*0.5 + this.nSwiper.spacePx * this.index + this.nSwiper.itemHeightPx * this.index
			}
			style += `top:${left}px;width:${this.nSwiper.itemWidthPx}px;;height:${this.nSwiper.itemHeightPx}px;`
			this.mrStyle = style
		},
		data() {
			return {
				index: 0,
				mrStyle: ''
			}
		},
		methods: {
			getExp(current) {
				const maxX = this.nSwiper.itemHeightPx + this.nSwiper.spacePx
				let left = - current * maxX
				const index = this.index
				const length = this.nSwiper.children.length
				if (this.nSwiper.circle) {
					left = this.toGetLeft(maxX, current, index, true)
					if (left === '') {
						return `0+${5*maxX}`
					}
				}
				return `y+${left}`
			},
			getScaleExp(current) {
				const sameExp = `${this.nSwiper.scale}+0`
				const maxX = this.nSwiper.itemHeightPx + this.nSwiper.spacePx
				const minusExp = `max(1 - abs(y/${maxX}), ${this.nSwiper.scale})`
				const plusExp = `min(1, ${this.nSwiper.scale}+abs(y/${maxX}))`
				const circle = this.nSwiper.circle
				const index = this.index
				const length = this.nSwiper.children.length
				let exp = sameExp
				if (current === index) {
					exp = minusExp
				} else {
					if (current - 1 === index) {
						exp = `y>=0?${plusExp}:${sameExp}`
					} else if (current + 1 === index) {
						exp = `y>=0?${sameExp}:${plusExp}`
					}
					if (circle) {
						if (current === 0 && index === length - 1) {
							exp = `y>=0?${plusExp}:${sameExp}`
						} else if (current === length - 1 && index === 0) {
							exp = `y>=0?${sameExp}:${plusExp}`
						}
					}
				}
				return exp
			},
			toAdjust(x, time, init) {
				const that = this
				const current = this.nSwiper.inCurrent
				const circle = this.nSwiper.circle
				const length = this.nSwiper.children.length
				const index = this.index
				let duration = this.nSwiper.duration
				const maxX = this.nSwiper.itemHeightPx + this.nSwiper.spacePx
				const scale = this.nSwiper.scale
				// 确定当前的current，以及调整每一个item的位置
				let iScale = scale
				const percent = 0.4
				let needChange = Math.abs(x) >= percent * maxX
				if (!needChange) {
					// 60ms 30px 算swipe动作
					if (time <= 60 && Math.abs(x) >= 30) {
						needChange = true
					}
				}
				let toCurrent = current
				if (needChange) {
					toCurrent = x > 0 ? (current - 1) : (current + 1)
					if (toCurrent < 0) {
						if (circle) {
							toCurrent = length - 1
						} else {
							toCurrent = 0
						}
					} else if (toCurrent >= length) {
						if (circle) {
							toCurrent = 0
						} else {
							toCurrent = length - 1
						}
					}
				}
				if (toCurrent === index) {
					iScale = 1
				}
				let left = maxX * toCurrent * -1
				if (circle) {
					//
					// 初始化，拼凑5个数据，然后按照数据进行移动，移动之后，在根据移动的方向上进行内容补贴
					//
					if (init) {
						this.toInitCircle(maxX, current, index, iScale)
						return
					}
					// 先平移，移动之后再补充内容
					left = this.toGetLeft(maxX, current, index)
					if (current != toCurrent) {
						left += x >= 0 ? maxX : -maxX
					}
				}
				animation.transition(this.$refs['n-swiper-v-item'], {
					styles: {
						transform: `translateY(${left}px) scale(${iScale})`,
					},
					duration: duration,
					delay: 0,
					timingFunction: this.nSwiper.timingFunction || 'ease',
					needLayout: false
				}, (res)=>{
					that.nSwiper.inCurrent = toCurrent
					that.nSwiper.inMoving = false
					// 补充数据
					if (needChange && circle) {
						// 可以移除掉5级的补充策略，不补充其实就是3级的策略
						that.toSupplyCircle(maxX, current, toCurrent, length)
					}
				})
			},
			toPosition(current, dest) {
				
			},
			// 因为在Android上面，哪怕设置不重复的transition，以前的别的transition效果也可能会被清除掉
			// 所以，我们这里不仅仅只是opacity，还要保留以前的结果
			toOpacityShow(left, scale) {
				animation.transition(this.$refs['n-swiper-v-item'], {
					styles: {
						transform: `translateY(${left}px) scale(${scale})`,
						opacity: 1
					},
					duration: 0, // this.nSwiper.duration,
					delay: 0,
					timingFunction: this.nSwiper.timingFunction || 'ease',
					needLayout: false
				}, (res)=>{
					
				})
			},
			toInitCircle(maxX, toCurrent, index, iScale) {
				const duration = this.nSwiper.duration
				const left = this.toGetLeft(maxX, toCurrent, index)
				let opacity = 0
				if (toCurrent === index) {
					opacity = 1
				}
				const that = this
				animation.transition(this.$refs['n-swiper-v-item'], {
					styles: {
						opacity: `${opacity}`,
					},
					duration: 0,
					delay: 0,
					timingFunction: this.nSwiper.timingFunction || 'ease',
					needLayout: false
				}, (res)=>{
					animation.transition(that.$refs['n-swiper-v-item'], {
						styles: {
							transform: `translateY(${left}px) scale(${iScale})`,
							opacity: opacity
						},
						duration: duration,
						delay: 0,
						timingFunction: that.nSwiper.timingFunction || 'ease',
						needLayout: false
					}, (res)=>{
						that.nSwiper.inCurrent = toCurrent
						that.nSwiper.inMoving = false
						if (opacity === 0) {
							that.toOpacityShow(left, iScale)
						}
					})
				})
			},
			toSupplyCircle(maxX, current, toCurrent, length) {
				const that = this
				const iScale = this.nSwiper.scale
				// 检查两端的数据，需要移动的，先隐藏，再移动
				// 向左还是向右
				let toLeft = false
				if (current === length - 1 && toCurrent === 0) {
					toLeft = true
				} else if (current === 0 && toCurrent === length - 1) {
					toLeft = false
				} else if (current < toCurrent) {
					toLeft = true
				}
				if (toLeft) {
					let popIdx = current - 2
					if (popIdx + 1 < 0) {
						popIdx = length - 2
					}
					if (popIdx < 0) {
						popIdx = length - 1
					}
					let pushIdx = toCurrent + 2
					if (pushIdx - 1 >= length) {
						pushIdx = 1
					}
					if (pushIdx >= length) {
						pushIdx = 0
					}
					if (this.index === popIdx) {
						animation.transition(this.$refs['n-swiper-v-item'], {
							styles: {
								opacity: 0,
								transform: `translateY(${5*maxX}px) scale(${iScale})`
							},
							duration: 0,
							delay: 0,
							needLayout: false
						}, res => {
							that.toOpacityShow(5*maxX, iScale)
						})
					}
					if (this.index === pushIdx) {
						animation.transition(this.$refs['n-swiper-v-item'], {
							styles: {
								opacity: 0,
								transform: `translateY(${-1*maxX*(pushIdx-2)}px) scale(${iScale})`
							},
							duration: 0,
							delay: 0,
							needLayout: false
						}, res => {
							that.toOpacityShow(-1*maxX*(pushIdx-2), iScale)
						})
					}
					return
				}
				let popIdx = current + 2
				if (popIdx - 1 >= length) {
					popIdx = 1
				}
				if (popIdx >= length) {
					popIdx = 0
				}
				let pushIdx = toCurrent - 2
				if (pushIdx + 1 < 0) {
					pushIdx = length - 2
				}
				if (pushIdx < 0) {
					pushIdx = length - 1
				}
				if (this.index === popIdx) {
					animation.transition(this.$refs['n-swiper-v-item'], {
						styles: {
							opacity: 0,
							transform: `translateY(${5*maxX}px) scale(${iScale})`
						},
						duration: 0,
						delay: 0,
						needLayout: false
					}, res => {
						that.toOpacityShow(5*maxX, iScale)
					})
				}
				if (this.index === pushIdx) {
					animation.transition(this.$refs['n-swiper-v-item'], {
						styles: {
							opacity: 0,
							transform: `translateY(${-1*maxX*(pushIdx+2)}px) scale(${iScale})`
						},
						duration: 0,
						delay: 0,
						needLayout: false
					}, res => {
						that.toOpacityShow(-1*maxX*(pushIdx+2), iScale)
					})
				}
			},
			toGetLeft(maxX, toCurrent, index, isExp) {
				const length = this.nSwiper.children.length
				let left = maxX * toCurrent * -1
				// circle的话，至少准备5个数据
				// 不足5个数据请自行重复拼凑，不会检验
				let leftIdx = toCurrent - 1
				let leftIdx2 = toCurrent - 2
				if (leftIdx < 0) {
					leftIdx = length - 1
					leftIdx2 = length - 2
				}
				if (leftIdx2 < 0) {
					leftIdx2 = length - 1
				}
				let rightIdx = toCurrent + 1
				let rightIdx2 = toCurrent + 2
				if (rightIdx >= length) {
					rightIdx = 0
					rightIdx2 = 1
				}
				if (rightIdx2 >= length) {
					rightIdx2 = 0
				}
				if (index === leftIdx) {
					left = maxX * (leftIdx + 1) * -1
				} else if (index === rightIdx) {
					left = maxX * (rightIdx - 1) * -1
				} else if (index === leftIdx2) {
					left = maxX * (leftIdx2 + 2) * -1
				} else if (index === rightIdx2) {
					left = maxX * (rightIdx2 - 2) * -1
				} else if (index != toCurrent) {
					if (isExp) {
						return ''
					}
					left = maxX * 5
				}
				return left
			}
		}
	}
</script>

<style>
</style>
