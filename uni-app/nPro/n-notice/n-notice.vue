<template>
	<view v-if="showing" :class="['n-flex-row', 'n-align-center', 'n-noticebar', 'n-bg-'+bgType, 'n-height-'+height, 'n-border-'+border, 'n-radius-'+radius]" :style="boxStyle" bubble="true" @tap.stop="noticeBarClicked">
		<n-icon v-if="icon" :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="'margin-right:'+space+';'+iconBoxStyle" @iconClicked="noticeBarClicked"></n-icon>
		<text :class="['n-flex-1', 'n-lines-1', 'n-size-'+textSize, 'n-color-'+textType]" :style="textStyle">{{text}}</text>
		<n-icon v-if="indicator" :name="indicator" :type="indicatorType" :size="indicatorSize" :iconStyle="indicatorStyle" :boxStyle="'margin-left:'+space+';'+indicatorBoxStyle" @iconClicked="indicatorClicked"></n-icon>
	</view>
</template>

<script>
	/**
	 * notice
	 * @description 提示组件
	 * @property {String} icon 左侧图标
	 * @property {String} text 文字内容
	 * @property {String} indicator 右侧图标
	 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
	 * @property {String} height = [ss|s|base|l|ll] 高度主题
	 * @property {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
	 * @property {String} radius = [ss|s|base|l|ll|none] 圆角主题
	 * @property {String} textType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 文字颜色主题
	 * @property {String} textSize = [ss|s|base|l|ll] 文字尺寸主题
	 * @property {String} iconType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 图标主题
	 * @property {String} iconSize = [ss|s|base|l|ll] 图标尺寸主题
	 * @property {String} iconStyle 图标样式
	 * @property {String} indicatorType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 右侧图标颜色主题
	 * @property {String} indicatorSize = [ss|s|base|l|ll] 右侧图标尺寸主题
	 * @property {String} indicatorStyle 右侧图标样式
	 * @property {String} space 间距
	 * @property {String} textStyle 文字样式
	 * @property {String} boxStyle 外层样式
	 * @property {String} iconBoxStyle 图标外层样式
	 * @property {String} indicatorBoxStyle 右侧图标外层样式
	 * @property {Boolean} closable = [true|false] 是否可以关闭
	 */
	export default {
		name: 'n-notice',
		props: {
			/**
			 * 左侧图标
			 */
			icon: {
				type: String,
				default: null
			},
			/**
			 * 文字内容
			 */
			text: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标
			 */
			indicator: {
				type: String,
				default: null
			},
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * 高度主题
			 */
			height: {
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
			 * 圆角主题
			 */
			radius: {
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
			 * 文字尺寸主题
			 */
			textSize: {
				type: String,
				default: 'base'
			},
			/**
			 * 图标主题
			 */
			iconType: {
				type: String,
				default: ''
			},
			/**
			 * 图标尺寸主题
			 */
			iconSize: {
				type: String,
				default: 'll'
			},
			/**
			 * 图标样式
			 */
			iconStyle: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标颜色主题
			 */
			indicatorType: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标尺寸主题
			 */
			indicatorSize: {
				type: String,
				default: 'll'
			},
			/**
			 * 右侧图标样式
			 */
			indicatorStyle: {
				type: String,
				default: ''
			},
			/**
			 * 间距
			 */
			space: {
				type: String,
				default: '12rpx'
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
			},
			/**
			 * 图标外层样式
			 */
			iconBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标外层样式
			 */
			indicatorBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 是否可以关闭
			 */
			closable: {
				type: Boolean,
				default: false
			}
		},
		data: () => ({
			showing: true
		}),
		methods: {
			show() {
				this.showing = true
			},
			hide() {
				this.showing = false
			},
			noticeBarClicked(e) {
				e.stopPropagation && e.stopPropagation()
				this.$emit("noticeClicked")
			},
			indicatorClicked() {
				if (this.closable) {
					this.showing = false
				} else {
					this.$emit("indicatorClicked")
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.n-noticebar {
		padding-left: 32rpx;
		padding-right: 32rpx;
	}
</style>
