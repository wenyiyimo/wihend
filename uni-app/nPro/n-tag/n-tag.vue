<template>
	<view :class="['n-flex-row', 'n-justify-center', 'n-align-center', 'n-height-'+height, 'n-bg-'+mrBgType, 'n-border-'+mrBorder, 'n-radius-'+radius, disabled && 'n-disabled']" :style="mrBoxStyle" @tap.stop="toSelect">
		<slot>
			<text :class="['n-size-'+textSize, 'n-color-'+mrTextType]" :style="mrTextStyle">{{text}}</text>
		</slot>
		<slot name="extra"></slot>
	</view>
</template>

<script>
	/**
	 * tag
	 * @description 标签
	 * @property {Number, String} text 文字内容
	 * @property {String, Number} value 唯一值
	 * @property {Boolean} selected = [true|false] 是否选中/活跃
	 * @property {Boolean} disabled = [true|false] 是否禁用
	 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
	 * @property {String} selectedbgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 选中时背景主题
	 * @property {String} textType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 文字颜色主题
	 * @property {String} selectedTextType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 选中时文字颜色主题
	 * @property {String} disabledTextType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 禁用时文字颜色主题
	 * @property {String} textSize = [ss|s|base|l|ll] 文字尺寸主题
	 * @property {String} height = [ss|s|base|l|ll] 高度主题
	 * @property {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
	 * @property {String} selectedBorder = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 选中时边框主题
	 * @property {String} radius = [ss|s|base|l|ll|none] 圆角主题
	 * @property {String} space 左右两侧的padding
	 * @property {String} textStyle 文字样式
	 * @property {String} selectedTextStyle 选中时文字样式
	 * @property {String} disabledTextStyle 禁用时文字样式
	 * @property {String} boxStyle 外层样式
	 * @property {String} selectedBoxStyle 选中时文字样式
	 * @property {String} disabledBoxStyle 禁用时文字样式
	 * @event {Function} tagClicked 点击事件
	 */
	export default {
		name: 'n-tag',
		props: {
			/**
			 * 文字内容
			 */
			text: {
				type: [Number, String],
				default: ""
			},
			/**
			 * 唯一值
			 */
			value: {
				type: [String, Number],
				default: ''
			},
			/**
			 * 是否选中/活跃
			 */
			selected: {
				type: Boolean,
				default: false
			},
			/**
			 * 是否禁用
			 */
			disabled: {
				type: Boolean,
				default: false
			},
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * 选中时背景主题
			 */
			selectedBgType: {
				type: String,
				default: ''
			},
			/**
			 * 文字颜色主题
			 */
			textType: {
				type: String,
				default: ''
			},
			/**
			 * 选中时文字颜色主题
			 */
			selectedTextType: {
				type: String,
				default: ''
			},
			/**
			 * 禁用时文字颜色主题
			 */
			disabledTextType: {
				type: String,
				default: 'disabled'
			},
			/**
			 * 文字尺寸主题
			 */
			textSize: {
				type: String,
				default: ''
			},
			/**
			 * 高度主题
			 */
			height: {
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
			 * 选中时边框主题
			 */
			selectedBorder: {
				type: String,
				default: 'all'
			},
			/**
			 * 圆角主题
			 */
			radius: {
				type: String,
				default: 'base'
			},
			/**
			 * 左右两侧的padding
			 */
			space: {
				type: String,
				default: '16rpx'
			},
			/**
			 * 文字样式
			 */
			textStyle: {
				type: String,
				default: ''
			},
			/**
			 * 选中时文字样式
			 */
			selectedTextStyle: {
				type: String,
				default: ''
			},
			/**
			 * 禁用时文字样式
			 */
			disabledTextStyle: {
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
			 * 选中时文字样式
			 */
			selectedBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 禁用时文字样式
			 */
			disabledBoxStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
			}
		},
		computed: {
			mrBorder() {
				if (this.selected) {
					return this.selectedBorder
				}
				return this.border
			},
			mrBgType() {
				if (this.selected) {
					return this.selectedBgType
				}
				return this.bgType
			},
			mrTextType() {
				if (this.selected) {
					if (this.disabled) {
						if (this.disabledTextType && this.disabledTextType.length > 0) {
							return this.disabledTextType
						}
						return this.selectedBgType && this.selectedBgType.length > 0 ? 'inverse' : ''
					}
					if (this.selectedTextType && this.selectedTextType.length > 0) {
						return this.selectedTextType
					}
					return this.selectedBgType && this.selectedBgType.length > 0 ? 'inverse' : ''
				}
				if (this.disabled) {
					if (this.disabledTextType && this.disabledTextType.length > 0) {
						return this.disabledTextType
					}
					return this.bgType && this.bgType.length > 0 ? 'inverse' : ''
				}
				if (this.textType && this.textType.length > 0) {
					return this.textType
				}
				return this.bgType && this.bgType.length > 0 ? 'inverse' : ''
			},
			mrBoxStyle() {
				let _style = `padding-left:${this.space};padding-right:${this.space};`
				_style += this.boxStyle
				if (this.selected) {
					_style += this.selectedBoxStyle
				}
				if (this.disabled) {
					_style += this.disabledBoxStyle
				}
				return _style
			},
			mrTextStyle() {
				let _style = this.textStyle
				if (this.selected) {
					_style += this.selectedTextStyle
				}
				if (this.disabled) {
					_style += this.disabledTextStyle
				}
				return _style
			}
		},
		methods: {
			toSelect(e) {
				if (!this.disabled) {
					this.$emit("tagClicked", {
						selected: this.selected,
						value: this.value
					})
				}
				e.stopPropagation && e.stopPropagation()
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
