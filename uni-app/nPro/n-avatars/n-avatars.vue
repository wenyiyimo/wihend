<template>
	<view :class="['n-flex-row', 'n-align-center', 'n-position-relative']" :style="mrBoxStyle+boxStyle" bubble="true">
		<image v-for="(item,idx) in updatedItems" :key="idx" :src="label?item[label]:item" :style="mrItemStyle(idx)+itemStyle" mode="aspectFill" @click.stop="toItem($event, item)"></image>
	</view>
</template>

<script>
	/**
	 * avatars
	 * @description 头像群
	 * @property {Array} items 头像内容
	 * @property {String} label 允许指定头像在内容中的字段
	 * @property {Boolean} reverse = [true|false] 是否左侧图标在上面
	 * @property {string} size 头像的大小
	 * @property {String} space 头像之间的间距
	 * @property {String} itemStyle 头像的外层样式
	 * @property {String} boxStyle 外层样式
	 * @event {Function} itemClicked 点击事件
	 */
	export default {
		name: 'n-avatars',
		props: {
			items: {
				type: Array,
				default: ()=>{
					return []
				}
			},
			label: {
				type: String,
				default: ''
			},
			reverse: {
				type: Boolean,
				default: false
			},
			size: {
				type: String,
				default: '66rpx'
			},
			space: {
				type: String,
				default: '-16rpx'
			},
			itemStyle: {
				type: String,
				default: ''
			},
			boxStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			inReverse() {
				return this.reverse && parseInt(this.space) < 0
			},
			updatedItems() {
				if (this.inReverse) {
					return this.items.slice().reverse()
				} else {
					return this.items
				}
			},
			sizeNum() {
				return parseInt(this.size)
			},
			spaceNum() {
				return parseInt(this.space)
			},
			spaceUnit() {
				if (this.space.indexOf('rpx') >= 0 || this.space.indexOf('upx') >= 0) {
					return 'rpx'
				}
				return 'px'
			},
			mrBoxStyle() {
				if (this.inReverse) {
					return `width:${(this.sizeNum+this.spaceNum)*this.items.length-this.spaceNum}${this.spaceUnit};height:${this.size};`
				}
				return ''
			}
		},
		methods: {
			mrItemStyle(idx) {
				let style = `width:${this.size};height:${this.size};border-radius:${this.size};`
				if (this.inReverse) {
					style += `position:absolute;right:${idx*(this.sizeNum + this.spaceNum)}${this.spaceUnit};`
				} else {
					style += (idx>0?`margin-left:${this.space};`:'margin-left:0;')
				}
				return style
			},
			toItem(e, val) {
				e && (e['item'] = val)
				this.$emit("itemClicked", e)
				e && e.stopPropagation && e.stopPropagation()
			}
		}
	}
</script>

<style>
</style>
