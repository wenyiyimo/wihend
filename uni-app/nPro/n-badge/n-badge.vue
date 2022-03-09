<template>
	<view :class="['n-justify-center', 'n-align-center', 'n-bg-'+bgType, 'n-border-'+border]" :style="mrBoxStyle">
		<text :class="['n-color-'+textType, 'n-size-'+textSize]" :style="textStyle">{{text}}</text>
	</view>
</template>

<script>
	/**
	 * badge 角标
	 * @description 角标，支持文字/圆角/背景等
	 * @property  {String} size = [ss|s|base|l|ll] 圆点样式的直径大小，不是圆点时需要设置为0
	 * @property  {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
	 * @property  {String} text 文字内容
	 * @property  {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
	 * @property  {String} textType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 文字颜色主题
	 * @property  {String} textSize = [ss|s|base|l|ll] 文字尺寸主题
	 * @property  {String} textStyle 文字样式
	 * @property  {String} boxStyle 外层样式
	*/
	export default {
		name: 'n-badge',
		props: {
			/**
			 * 圆点样式的直径大小，不是圆点时需要设置为0
			 */
			size: {
				type: String,
				default: '12rpx'
			},
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: 'error'
			},
			/**
			 * 文字内容
			 */
			text: {
				type: [String, Number],
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
			 * 文字颜色主题
			 */
			textType: {
				type: String,
				default: 'inverse'
			},
			/**
			 * 文字尺寸主题
			 */
			textSize: {
				type: String,
				default: 'ss'
			},
			/**
			 * 文字样式
			 */
			textStyle: {
				type: String,
				default: ''
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			mrBoxStyle() {
				if (!this.size || this.size.length === 0 || parseInt(this.size)===0) {
					return this.boxStyle
				}
				return `width:${this.size};height:${this.size};border-radius:${this.size};` + this.boxStyle
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
