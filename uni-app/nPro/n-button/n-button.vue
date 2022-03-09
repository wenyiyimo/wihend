<template>
	<view bubble="true" :class="['n-flex-row', 'n-justify-center', 'n-align-center', 'n-position-relative', 'n-border-'+border, 'n-bg-'+bgType, 'n-height-'+height, 'n-radius-'+radius, (disabled||loading)?'n-disabled':'', (disabled||loading)?'':('n-hover-'+hover+'-n')]" :style="boxStyle" :hover-class="(!disabled && !loading) ? ('n-hover-'+hover): ''" @click.stop="clickedButton">
		<slot>
			<n-loading-indicator v-if="loading" :width="loadingWidth" :height="loadingHeight" :src="loadingSrc"></n-loading-indicator>
			<n-icon v-if="!loading && icon && icon.length > 0" :name="icon" :type="iconType" :size="iconSize" :boxStyle="iconBoxStyle" :iconStyle="iconStyle" @iconClicked="clickedButton"></n-icon>
			<text v-if="text&&text.length>0" :class="['n-color-'+textType, 'n-size-'+textSize]" :style="mrTextStyle">{{text}}</text>
			<n-icon v-if="icon2 && icon2.length > 0" :name="icon2" :type="icon2Type" :size="icon2Size" :boxStyle="mrIcon2BoxStyle" :iconStyle="icon2Style" @iconClicked="clickedButton"></n-icon>
		</slot>
		<slot name="extra"></slot>
	</view>
</template>

<script>
	/**
	 * button
	 * @description 按钮
	 * @property  {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
	 * @value primary 主色
	 * @value success 成功
	 * @value warning 警告
	 * @value error 错误
	 * @property  {String} text 文字内容
	 * @property  {String} icon 左侧图标
	 * @property  {String} icon2 右侧图标
	 * @property  {Boolean} loading = [true|false] 是否为loading状态
	 * @property  {String} loadingSrc loading状态时显示的图片
	 * @property  {String} height = [ss|s|base|l|ll] 高度主题
	 * @value ss 最小
	 * @value s 小
	 * @value base 基础大小
	 * @value l 大
	 * @value ll 最大
	 * @property  {String} hover 点击时的hover效果: opacity/bg/bg-opacity
	 * @property  {String} radius = [ss|s|base|l|ll|none] 圆角主题
	 * @value ss 最小
	 * @value s 小
	 * @value base 基础大小
	 * @value l 大
	 * @value ll 最大
	 * @value none 无圆角
	 * @property  {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
	 * @property  {Boolean} disabled = [true|false] 是否为禁用状态。禁用时不可点击
	 * @property  {String} space 文字与图标之间的间距
	 * @property  {String} textType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 文字颜色主题
	 * @property  {String} textSize = [ss|s|base|l|ll] 文字尺寸主题
	 * @value ss 最小
	 * @value s 小
	 * @value base 基础大小
	 * @value l 大
	 * @value ll 最大
	 * @property  {String} iconType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 左侧图标颜色主题
	 * @property  {String} iconSize = [ss|s|base|l|ll] 左侧图标尺寸主题
	 * @value ss 最小
	 * @value s 小
	 * @value base 基础大小
	 * @value l 大
	 * @value ll 最大
	 * @property  {String} icon2Type = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 右侧图标颜色主题
	 * @property  {String} icon2Size = [ss|s|base|l|ll] 右侧图标尺寸主题
	 * @value ss 最小
	 * @value s 小
	 * @value base 基础大小
	 * @value l 大
	 * @value ll 最大
	 * @property  {String} boxStyle 外层样式
	 * @property  {String} textStyle 文字样式
	 * @property  {String} iconBoxStyle 左侧图标外层样式
	 * @property  {String} iconStyle 左侧图标样式
	 * @property  {String} icon2BoxStyle 右侧图标外层样式
	 * @property  {String} icon2Style 右侧图标样式
	 * @property  {String} loadingWidth loading图标的宽度
	 * @property  {String} loadingHeight loading图标的高度
	 * @event {Function} buttonClicked 点击事件
	 */
	export default {
		name: 'n-button',
		props: {
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * 文字内容
			 */
			text: {
				type: String,
				default: ''
			},
			/**
			 * 左侧图标
			 */
			icon: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标
			 */
			icon2: {
				type: String,
				default: ''
			},
			/**
			 * 是否为loading状态
			 */
			loading: {
				type: Boolean,
				default: false
			},
			/**
			 * loading状态时显示的图片
			 */
			loadingSrc: {
				type: String,
				default: '/static/ui/loading.gif'
			},
			/**
			 * 高度主题
			 */
			height: {
				type: String,
				default: 'base'
			},
			/**
			 * 点击时的hover效果: opacity/bg/bg-opacity
			 */
			hover: {
				type: String,
				default: 'opacity'
			},
			/**
			 * 圆角主题
			 */
			radius: {
				type: String,
				default: 'base'
			},
			/**
			 * 边框主题
			 */
			border: {
				type: String,
				default: ''
			},
			/**
			 * 是否为禁用状态。禁用时不可点击
			 */
			disabled: {
				type: Boolean,
				default: false
			},
			/**
			 * 文字与图标之间的间距
			 */
			space: {
				type: String,
				default: '12rpx'
			},
			/**
			 * 文字颜色主题
			 */
			textType: {
				type: String,
				default: 'text'
			},
			/**
			 * 文字尺寸主题
			 */
			textSize: {
				type: String,
				default: 'base'
			},
			/**
			 * 左侧图标颜色主题
			 */
			iconType: {
				type: String,
				default: 'text'
			},
			/**
			 * 左侧图标尺寸主题
			 */
			iconSize: {
				type: String,
				default: 'l'
			},
			/**
			 * 右侧图标颜色主题
			 */
			icon2Type: {
				type: String,
				default: 'text'
			},
			/**
			 * 右侧图标尺寸主题
			 */
			icon2Size: {
				type: String,
				default: 'l'
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 文字样式
			 */
			textStyle: {
				type: String,
				default: ''
			},
			/**
			 * 左侧图标外层样式
			 */
			iconBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 左侧图标样式
			 */
			iconStyle: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标外层样式
			 */
			icon2BoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标样式
			 */
			icon2Style: {
				type: String,
				default: ''
			},
			/**
			 * loading图标的宽度
			 */
			loadingWidth: {
				type: String,
				default: '36rpx'
			},
			/**
			 * loading图标的高度
			 */
			loadingHeight: {
				type: String,
				default: '36rpx'
			}
		},
		computed: {
			mrTextStyle() {
				let _style = ''
				if (this.text && this.text.length > 0) {
					if (this.loading) {
						_style += `margin-left: ${this.space};`
					} else {
						if (this.icon && this.icon.length > 0) {
							_style += `margin-left: ${this.space};`
						}
					}
				}
				_style += this.textStyle
				return _style
			},
			mrIcon2BoxStyle() {
				let _style = ''
				_style += `margin-left: ${this.space};`
				return _style + this.icon2BoxStyle
			}
		},
		methods: {
			clickedButton(e) {
				if (!this.disabled && !this.loading) {
					this.$emit('buttonClicked', e)
				}
				e && e.stopPropagation && e.stopPropagation()
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
