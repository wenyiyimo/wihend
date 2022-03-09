<template>
	<view id="n-ske" ref="n-ske" :class="['n-flex-'+flex, 'n-align-'+align, 'n-justify-'+justify, animate&&'ske-ani']" :style="boxStyle">
		<view v-if="avatar" :style="{width: avatarWidth, height: avatarHeight, 'border-radius': avatarRadius, 'background-color': bg}"></view>
		<view v-if="showSpaceN" :style="spaceN"></view>
		<view v-if="hasRows" :class="['n-flex-column', 'n-align-'+rowsAlign, 'n-justify-'+rowsJustify]" :style="rowsStyle">
			<view v-for="(item,idx) in rowItems" :key="idx" :style="{'margin-bottom': idx==rowItems.length-1?'0':rowsSpace, width: item.width, height: item.height, 'background-color': bg, 'border-radius': rowsRadius}"></view>
		</view>
		<view v-if="showSpaceM" :style="spaceM"></view>
		<view v-if="indicator" :style="{width: indicatorWidth, height: indicatorHeight, 'border-radius': indicatorRadius, 'background-color': bg}"></view>
	</view>
</template>

<script>
	import {animate} from '../utils/animate.js'
	
	export default {
		name: 'n-skeleton',
		props: {
			flex: {
				type: String,
				default: 'row'
			},
			align: {
				type: String,
				default: 'center'
			},
			justify: {
				type: String,
				default: 'center'
			},
			space: {
				type: String,
				default: '24rpx'
			},
			bg: {
				type: String,
				default: '#CCC8C8'
			},
			avatar: {
				type: Boolean,
				default: true
			},
			avatarWidth: {
				type: String,
				default: '120rpx'
			},
			avatarHeight: {
				type: String,
				default: '120rpx'
			},
			avatarRadius: {
				type: String,
				default: '12rpx'
			},
			rows: {
				type: Number,
				default: 2
			},
			rowsWidth: {
				type: Array,
				default: ()=>{
					return ['400rpx']
				}
			},
			rowsHeight: {
				type: Array,
				default: ()=>{
					return ['12rpx']
				}
			},
			rowsRadius: {
				type: String,
				default: '12rpx'
			},
			rowsAlign: {
				type: String,
				default: 'center'
			},
			rowsJustify: {
				type: String,
				default: 'center'
			},
			rowsSpace: {
				type: String,
				default: '20rpx'
			},
			rowsStyle: {
				type: String,
				default: ''
			},
			indicator: {
				type: Boolean,
				default: true
			},
			indicatorWidth: {
				type: String,
				default: '120rpx'
			},
			indicatorHeight: {
				type: String,
				default: '120rpx'
			},
			indicatorRadius: {
				type: String,
				default: '12rpx'
			},
			animate: {
				type: Boolean,
				default: true
			},
			boxStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
			}
		},
		computed: {
			hasRows() {
				return this.rows > 0
			},
			rowItems() {
				const its = []
				const wl = this.rowsWidth.length
				const hl = this.rowsHeight.length
				for (let i = 0; i < this.rows; i++) {
					const theR = this.rows[i]
					its.push({width: this.rowsWidth[i]||this.rowsWidth[wl-1]||0, height: this.rowsHeight[i]||this.rowsHeight[hl-1]||0})
				}
				return its
			},
			showSpaceN() {
				return this.avatar && this.hasRows
			},
			showSpaceM() {
				return (this.avatar || this.hasRows) && this.indicator
			},
			spaceN() {
				if (this.flex=='row') {
					return `width: ${this.space};`
				}
				return `height: ${this.space};`
			},
			spaceM() {
				if (this.flex=='row') {
					return `width: ${this.space};`
				}
				return `height: ${this.space};`
			}
		},
		mounted() {
			// #ifdef APP-NVUE
			setTimeout(()=>{
				this.animate && this.toAnimate()
			}, 0)
			// #endif
		},
		methods: {
			toAnimate() {
				// #ifdef APP-NVUE
				const that = this
				const el = this.$refs['n-ske']
				animate(el, {
					styles: {
						opacity: 0.6
					},
					duration: 400,
					timingFunction: 'ease-in-out'
				}).then(()=>{
					animate(el, {
						styles: {
							opacity: 1
						},
						duration: 400,
						timingFunction: 'ease-in-out'
					}).then(()=>{
						that.toAnimate()
					}).catch(err=>{
						console.log(err)
					})
				}).catch(err=>{
					console.log(err)
				})
			// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ske {
		&-ani {
			/* #ifndef APP-NVUE */
			animation: timing-opa ease-in-out 0.8s infinite;
			/* #endif */
		}
	}
	/* #ifndef APP-NVUE */
	@keyframes timing-opa {
		50% {
			opacity: 0.6;
		}
	}
	/* #endif */
</style>
