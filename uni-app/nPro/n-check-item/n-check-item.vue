<template>
	<view :class="['n-border-'+border, 'n-radius-'+radius, 'n-bg-'+bgType, 'n-hover-'+hover+'-n']" :style="boxStyle" :hover-class="'n-hover-'+hover" bubble="true" @tap="toSelect">
		<slot></slot>
	</view>
</template>

<script>
	/**
	 * check-item
	 * @description 自定义内容单多选的选择项
	 * @property {Number, String} value 唯一值/返回的内容
	 * @property {Boolean} disabled = [true|false] 是否禁用
	 * @property {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
	 * @property {String} radius = [ss|s|base|l|ll|none] 圆角主题
	 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
	 * @property {String} hover = [opacity|bg|bg-dark|bg-opacity|none] hover主题
	 * @property {String} boxStyle 外层样式
	*/
	export default {
		name: 'n-check-item',
		props: {
			/**
			 * 唯一值/返回的内容
			 */
			value: {
				type: [Number, String],
				default: ''
			},
			/**
			 * 是否禁用
			 */
			disabled: {
				type: Boolean,
				default: false
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
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * hover主题
			 */
			hover: {
				type: String,
				default: 'opacity'
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			}
		},
		inject: ['mCheck'],
		methods: {
			toSelect() {
				if (this.disabled) {
					return
				}
				this.mCheck.toSelect(this.value)
			}
		}
	}
</script>

<style>
</style>
