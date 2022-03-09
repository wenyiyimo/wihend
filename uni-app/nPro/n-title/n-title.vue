<template>
	<view :class="['n-flex-row', 'n-align-center', 'n-justify-between', 'n-bg-'+bgType, 'n-height-'+height, 'n-hover-'+hover+'-n']" :style="boxStyle" :hover-class="'n-hover-'+hover">
		<view class="n-flex-row n-align-center" :style="leftStyle" bubble="true" @tap="leftClicked">
			<n-icon v-if="leftIcon1&&leftIcon1.length>0" :name="leftIcon1" :type="leftIcon1Type" :size="leftIcon1Size" :iconStyle="leftIcon1Style" @iconClicked="leftClicked"></n-icon>
			<text :class="['n-size-'+title1Size, 'n-color-'+title1Type]" :style="mrTitle1Style">{{title1}}</text>
			<n-icon v-if="leftIcon2&&leftIcon2.length>0" :name="leftIcon2" :type="leftIcon2Type" :size="leftIcon2Size" :iconStyle="leftIcon2Style" @iconClicked="leftClicked"></n-icon>
		</view>
		<view class="n-flex-row n-align-center" :style="centerStyle" bubble="true" @tap="centerClicked">
			<n-icon v-if="centerIcon1&&centerIcon1.length>0" :name="centerIcon1" :type="centerIcon1Type" :size="centerIcon1Size" :iconStyle="centerIcon1Style" @iconClicked="centerClicked"></n-icon>
			<text :class="['n-size-'+title2Size, 'n-color-'+title2Type]" :style="mrTitle2Style">{{title2}}</text>
			<n-icon v-if="centerIcon2&&centerIcon2.length>0" :name="centerIcon2" :type="centerIcon2Type" :size="centerIcon2Size" :iconStyle="centerIcon2Style" @iconClicked="centerClicked"></n-icon>
		</view>
		<view class="n-flex-row n-align-center" :style="rightStyle" bubble="true" @tap="rightClicked">
			<n-icon v-if="rightIcon1&&rightIcon1.length>0" :name="rightIcon1" :type="rightIcon1Type" :size="rightIcon1Size" :iconStyle="rightIcon1Style" @iconClicked="rightClicked"></n-icon>
			<text :class="['n-size-'+title3Size, 'n-color-'+title3Type]" :style="mrTitle3Style">{{title3}}</text>
			<n-icon v-if="rightIcon2&&rightIcon2.length>0" :name="rightIcon2" :type="rightIcon2Type" :size="rightIcon2Size" :iconStyle="rightIcon2Style" @iconClicked="rightClicked"></n-icon>
			<slot></slot>
		</view>
		<slot name="extra"></slot>
	</view>
</template>

<script>
	/**
	 * title
	 * @description 标题栏
	 * @property {String} title1 左侧标题
	 * @property {String} title2 中间标题
	 * @property {String} title3 右侧标题
	 * @property {String} leftIcon1 左侧图标1
	 * @property {String} leftIcon2 左侧图标2
	 * @property {String} centerIcon1 中间图标1
	 * @property {String} centerIcon2 中间图标2
	 * @property {String} rightIcon1 右侧图标1
	 * @property {String} rightIcon2 右侧图标2
	 * @property {String} space icon-text-icon之间的间距
	 * @property {String} height = [ss|s|base|l|ll] 高度主题
	 * @property {String} hover = [opacity|bg|bg-dark|bg-opacity|none] hover主题
	 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
	 * @property {String} title1Type = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 标题1的颜色主题
	 * @property {String} title1Size = [ss|s|base|l|ll] 标题1的尺寸主题
	 * @property {String} title1Style 标题1的样式
	 * @property {String} title2Type = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 标题2的颜色主题
	 * @property {String} title2Size = [ss|s|base|l|ll] 标题2的尺寸主题
	 * @property {String} title2Style 标题2的样式
	 * @property {String} title3Type = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 标题3的颜色主题
	 * @property {String} title3Size = [ss|s|base|l|ll] 标题3的尺寸主题
	 * @property {String} title3Style 标题3的样式
	 * @property {String} leftIcon1Type = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 左侧图标1的颜色主题
	 * @property {String} leftIcon1Size = [ss|s|base|l|ll] 左侧图标1的尺寸主题
	 * @property {String} leftIcon1Style 左侧图标1的样式
	 * @property {String} leftIcon2Type = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 左侧图标2的颜色主题
	 * @property {String} leftIcon2Size = [ss|s|base|l|ll] 左侧图标2的尺寸主题
	 * @property {String} leftIcon2Style 左侧图标2的样式
	 * @property {String} centerIcon1Type = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 中间图标1的颜色主题
	 * @property {String} centerIcon1Size = [ss|s|base|l|ll] 中间图标1的尺寸主题
	 * @property {String} centerIcon1Style 中间图标1的样式
	 * @property {String} centerIcon2Type = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 中间图标2的颜色主题
	 * @property {String} centerIcon2Size = [ss|s|base|l|ll] 中间图标2的尺寸主题
	 * @property {String} centerIcon2Style 中间图标2的样式
	 * @property {String} rightIcon1Type = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 右侧图标1的颜色主题
	 * @property {String} rightIcon1Size = [ss|s|base|l|ll] 右侧图标1的尺寸主题
	 * @property {String} rightIcon1Style 右侧图标1的样式
	 * @property {String} rightIcon2Type = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 右侧图标2的颜色主题
	 * @property {String} rightIcon2Size = [ss|s|base|l|ll] 右侧图标2的尺寸主题
	 * @property {String} rightIcon2Style 右侧图标2的样式
	 * @property {String} boxStyle 外层样式
	 * @property {String} leftStyle 左侧样式
	 * @property {String} centerStyle 中间样式
	 * @property {String} rightStyle 右侧样式
	 * @event {Function} leftClicked 左点击事件
	 * @event {Function} centerClicked 中点击事件
	 * @event {Function} rightClicked 右点击事件
	 */
	export default {
		name: 'n-title',
		props: {
			/**
			 * 左侧标题
			 */
			title1: {
				type: String,
				default: ''
			},
			/**
			 * 中间标题
			 */
			title2: {
				type: String,
				default: ''
			},
			/**
			 * 右侧标题
			 */
			title3: {
				type: String,
				default: ''
			},
			/**
			 * 左侧图标1
			 */
			leftIcon1: {
				type: String,
				default: ''
			},
			/**
			 * 左侧图标2
			 */
			leftIcon2: {
				type: String,
				default: ''
			},
			/**
			 * 中间图标1
			 */
			centerIcon1: {
				type: String,
				default: ''
			},
			/**
			 * 中间图标2
			 */
			centerIcon2: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标1
			 */
			rightIcon1: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标2
			 */
			rightIcon2: {
				type: String,
				default: ''
			},
			/**
			 * icon-text-icon之间的间距
			 */
			space: {
				type: String,
				default: '12rpx'
			},
			/**
			 * 高度主题
			 */
			height: {
				type: String,
				default: 'l'
			},
			/**
			 * hover主题
			 */
			hover: {
				type: String,
				default: ''
			},
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * 标题1的颜色主题
			 */
			title1Type: {
				type: String,
				default: 'text'
			},
			/**
			 * 标题1的尺寸主题
			 */
			title1Size: {
				type: String,
				default: 'base'
			},
			/**
			 * 标题1的样式
			 */
			title1Style: {
				type: String,
				default: ''
			},
			/**
			 * 标题2的颜色主题
			 */
			title2Type: {
				type: String,
				default: 'second'
			},
			/**
			 * 标题2的尺寸主题
			 */
			title2Size: {
				type: String,
				default: 'base'
			},
			/**
			 * 标题2的样式
			 */
			title2Style: {
				type: String,
				default: ''
			},
			/**
			 * 标题3的颜色主题
			 */
			title3Type: {
				type: String,
				default: 'third'
			},
			/**
			 * 标题3的尺寸主题
			 */
			title3Size: {
				type: String,
				default: 'base'
			},
			/**
			 * 标题3的样式
			 */
			title3Style: {
				type: String,
				default: ''
			},
			/**
			 * 左侧图标1的颜色主题
			 */
			leftIcon1Type: {
				type: String,
				default: 'text'
			},
			/**
			 * 左侧图标1的尺寸主题
			 */
			leftIcon1Size: {
				type: String,
				default: 'base'
			},
			/**
			 * 左侧图标1的样式
			 */
			leftIcon1Style: {
				type: String,
				default: ''
			},
			/**
			 * 左侧图标2的颜色主题
			 */
			leftIcon2Type: {
				type: String,
				default: 'text'
			},
			/**
			 * 左侧图标2的尺寸主题
			 */
			leftIcon2Size: {
				type: String,
				default: 'base'
			},
			/**
			 * 左侧图标2的样式
			 */
			leftIcon2Style: {
				type: String,
				default: ''
			},
			/**
			 * 中间图标1的颜色主题
			 */
			centerIcon1Type: {
				type: String,
				default: 'second'
			},
			/**
			 * 中间图标1的尺寸主题
			 */
			centerIcon1Size: {
				type: String,
				default: 'base'
			},
			/**
			 * 中间图标1的样式
			 */
			centerIcon1Style: {
				type: String,
				default: ''
			},
			/**
			 * 中间图标2的颜色主题
			 */
			centerIcon2Type: {
				type: String,
				default: 'second'
			},
			/**
			 * 中间图标2的尺寸主题
			 */
			centerIcon2Size: {
				type: String,
				default: 'base'
			},
			/**
			 * 中间图标2的样式
			 */
			centerIcon2Style: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标1的颜色主题
			 */
			rightIcon1Type: {
				type: String,
				default: 'third'
			},
			/**
			 * 右侧图标1的尺寸主题
			 */
			rightIcon1Size: {
				type: String,
				default: 'base'
			},
			/**
			 * 右侧图标1的样式
			 */
			rightIcon1Style: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标2的颜色主题
			 */
			rightIcon2Type: {
				type: String,
				default: 'third'
			},
			/**
			 * 右侧图标2的尺寸主题
			 */
			rightIcon2Size: {
				type: String,
				default: 'base'
			},
			/**
			 * 右侧图标2的样式
			 */
			rightIcon2Style: {
				type: String,
				default: ''
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 左侧样式
			 */
			leftStyle: {
				type: String,
				default: ''
			},
			/**
			 * 中间样式
			 */
			centerStyle: {
				type: String,
				default: ''
			},
			/**
			 * 右侧样式
			 */
			rightStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			mrTitle1Style() {
				let style = ''
				if (this.title1 && this.title1.length > 0) {
					if (this.leftIcon1 && this.leftIcon1.length > 0) {
						style += `margin-left:${this.space};`
					}
					if (this.leftIcon2 && this.leftIcon2.length > 0) {
						style += `margin-right:${this.space};`
					}
				}
				return style + this.title1Style
			},
			mrTitle2Style() {
				let style = ''
				if (this.title2 && this.title2.length > 0) {
					if (this.centerIcon1 && this.centerIcon1.length > 0) {
						style += `margin-left:${this.space};`
					}
					if (this.centerIcon2 && this.centerIcon2.length > 0) {
						style += `margin-right:${this.space};`
					}
				}
				return style + this.title2Style
			},
			mrTitle3Style() {
				let style = ''
				if (this.title3 && this.title3.length > 0) {
					if (this.rightIcon1 && this.rightIcon1.length > 0) {
						style += `margin-left:${this.space};`
					}
					if (this.rightIcon2 && this.rightIcon2.length > 0) {
						style += `margin-right:${this.space};`
					}
				}
				return style + this.title3Style
			}
		},
		methods: {
			leftClicked() {
				this.$emit("leftClicked")
			},
			centerClicked() {
				this.$emit("centerClicked")
			},
			rightClicked() {
				this.$emit("rightClicked")
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
