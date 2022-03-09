<template>
	<view :class="['n-flex-row', 'n-align-center', 'n-wrap-nowrap', 'n-bg-'+bgType, 'n-height-'+height, 'n-radius-'+radius, 'n-border-'+border]" :style="boxStyle" bubble="true" @click="toDetail">
		<n-icon v-if="icon&&icon.length>0" :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="'margin-right:'+space+';'+iconBoxStyle" @iconClicked="toDetail"></n-icon>
		<slot name="label">
			<text v-if="label&&label.length>0" :class="['n-color-'+labelType, 'n-size-'+labelSize]" :style="'margin-right:'+space+';'+labelStyle">{{label||''}}</text>
		</slot>
		<!-- #ifndef APP-NVUE -->
		<view :class="['n-flex-1', 'n-position-relative', 'n-height-'+height]" :style="inputBoxHeightStyle">
			<view :class="['n-flex-row', 'n-align-center', 'n-input-place', 'n-input-place-'+valueAlign]">
				<text v-if="showPlaceholder" :class="['n-size-'+placeSize, 'n-color-'+placeType]" :style="placeStyle">{{placeholder||''}}</text>
			</view>
			<view class="n-flex-row n-align-center n-input-input">
				<input v-if="inputVisible" :disabled="disabled" :focus="focus" :type="type" :cursor-spacing="cursorSpacing" :adjust-position="adjust" :confirm-type="confirmType" :maxlength="maxlength" :value="inputValue||''" :password="password" :class="['n-color-'+valueType, 'n-size-'+valueSize]" :style="'text-align:'+valueAlign+';'+valueStyle" @input="handleInputedText" @confirm="handleConfirmText" @focus="toFocus" @blur="toBlur" @keyboardheightchange="toChangeKb" />
				<text v-else :class="['n-color-'+valueType, 'n-size-'+valueSize]" :style="'text-align:'+valueAlign+';'+valueStyle">{{inputValue||''}}</text>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef APP-NVUE -->
		<view class="n-flex-1 n-position-relative">
			<view :class="['n-flex-row', 'n-align-center', 'n-input-place', 'n-input-place-'+valueAlign]">
				<text v-if="showPlaceholder" :class="['n-size-'+placeSize, 'n-color-'+placeType]" :style="placeStyle">{{placeholder||''}}</text>
			</view>
			<input ref="n-input" v-if="isPassword" :disabled="disabled" :focus="focus" :cursor-spacing="cursorSpacing" :adjust-position="adjust" :confirm-type="confirmType" :maxlength="maxlength" :value="inputValue||''" :password="password" :class="['n-color-'+valueType, 'n-size-'+valueSize]" :style="'text-align:'+valueAlign+';'+valueStyle" @input="handleInputedText" @confirm="handleConfirmText" @focus="toFocus" @blur="toBlur" @keyboardheightchange="toChangeKb" />
			<input ref="n-input-1" v-else :disabled="disabled" :focus="focus" :type="type" :cursor-spacing="cursorSpacing" :adjust-position="adjust" :confirm-type="confirmType" :maxlength="maxlength" :value="inputValue||''" :class="['n-color-'+valueType, 'n-size-'+valueSize]" :style="'text-align:'+valueAlign+';'+valueStyle" @input="handleInputedText" @confirm="handleConfirmText" @focus="toFocus" @blur="toBlur" @keyboardheightchange="toChangeKb" />
		</view>
		<!-- #endif -->
		<slot name="extra"></slot>
		<n-icon v-if="indicator&&indicator.length>0" :name="indicator" :type="indicatorType" :size="indicatorSize" :iconStyle="indicatorStyle" :boxStyle="'margin-left:'+space+';'+indicatorBoxStyle" @iconClicked="rightTapped"></n-icon>
	</view>
</template>

<script>
	/**
	 * input
	 * @description
	 * @property {Array} format 自定义格式，每一段的长度:[3, 4, 4]
	 * @property {String} separator 自定义格式的分割器
	 * @property {Boolean} inputVisible = [true|false] 是否隐藏input
	 * @property {String} type = [text|number|idcard|digit|tel] input的type
	 * @value text 文本输入键盘
	 * @value number 数字输入键盘 均支持，App平台、H5平台 3.1.22 以下版本 vue 页面在 iOS 平台显示的键盘包含负数和小数。
	 * @value idcard 身份证输入键盘 微信、支付宝、百度、QQ小程序
	 * @value digit 带小数点的数字键盘 均支持，App平台、H5平台 vue 页面在 iOS 平台显示的键盘包含负数。
	 * @value tel 电话输入键盘 仅App的nvue页面支持
	 * @property {Number} maxlength 最大输入
	 * @property {Boolean} isPassword = [true|false] 是否用于密码输入框。 主要是为了兼容iOS下type与password共存时type不起作用
	 * @property {Boolean} password = [true|false] 是否密码
	 * @property {Boolean} focus = [true|false] 是否聚焦
	 * @property {Boolean} disabled = [true|false] 是否禁用
	 * @property {String} icon 左侧图标
	 * @property {String} label 左侧label文字
	 * @property {String} value 值
	 * @property {String} placeholder placeholder
	 * @property {String} indicator 右侧图标
	 * @property {String} valueAlign 文字排版
	 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
	 * @property {String} height = [ss|s|base|l|ll] 高度主题
	 * @property {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
	 * @property {String} radius = [ss|s|base|l|ll|none] 圆角主题
	 * @property {String} valueType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 值颜色主题
	 * @property {String} valueSize = [ss|s|base|l|ll] 值尺寸主题
	 * @property {String} iconType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 图标颜色主题
	 * @property {String} iconSize = [ss|s|base|l|ll] 图标尺寸主题
	 * @property {String} labelType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] label颜色主题
	 * @property {String} labelSize = [ss|s|base|l|ll] label尺寸主题
	 * @property {String} indicatorType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 右侧图标颜色主题
	 * @property {String} indicatorSize = [ss|s|base|l|ll] 右侧图标尺寸主题
	 * @property {String} placeType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] placeholder颜色主题
	 * @property {String} placeSize = [ss|s|base|l|ll] placeholder尺寸主题
	 * @property {Boolean} adjust = [true|false] 键盘adjust-position弹出方式
	 * @property {Number} cursorSpacing 指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
	 * @property {String} confirmType confirm-type
	 * @property {String} iconStyle 图标样式
	 * @property {String} iconBoxStyle 图标外层样式
	 * @property {String} labelStyle label样式
	 * @property {String} valueStyle 值样式
	 * @property {String} indicatorStyle 右侧图标样式
	 * @property {String} indicatorBoxStyle 右侧图标外层样式
	 * @property {String} boxStyle 外层样式
	 * @property {String} space 内部各元素之间的空隙
	 * @property {String} placeStyle placeholder的样式
	*/
	import {cssToJs} from '../utils/utils.js'
	
	export default {
		name: 'n-input',
		props: {
			/**
			 * 自定义格式，每一段的长度:[3, 4, 4]
			 */
			format: {
				type: Array,
				default: ()=>{return []}
			},
			/**
			 * 自定义格式的分割器
			 */
			separator: {
				type: String,
				default: " "
			},
			/**
			 * 是否隐藏掉input输入框
			 */
			inputVisible: {
				type: Boolean,
				default: true
			},
			/**
			 * input的type
			 */
			type: {
				type: String,
				default: "text"
			},
			/**
			 * 最大输入
			 */
			maxlength: {
				type: Number,
				default: 140
			},
			/**
			 * 是否用于密码输入框。
			 * 主要是为了兼容iOS下type与password共存时type不起作用
			 */
			isPassword: {
				type: Boolean,
				default: false
			},
			/**
			 * 是否密码
			 */
			password: {
				type: Boolean,
				default: false
			},
			/**
			 * 是否聚焦
			 */
			focus: {
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
			 * 左侧图标
			 */
			icon: {
				type: String,
				default: ''
			},
			/**
			 * 左侧label文字
			 */
			label: {
				type: String,
				default: ""
			},
			/**
			 * 值
			 */
			value: {
				type: String,
				default: ""
			},
			/**
			 * placeholder
			 */
			placeholder: {
				type: String,
				default: "请输入内容"
			},
			/**
			 * 右侧图标
			 */
			indicator: {
				type: String,
				default: ''
			},
			/**
			 * 文字排版
			 */
			valueAlign: {
				type: String,
				default: 'left'
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
			 * 值颜色主题
			 */
			valueType: {
				type: String,
				default: 'text'
			},
			/**
			 * 值尺寸主题
			 */
			valueSize: {
				type: String,
				default: 'base'
			},
			/**
			 * 图标颜色主题
			 */
			iconType: {
				type: String,
				default: 'text'
			},
			/**
			 * 图标尺寸主题
			 */
			iconSize: {
				type: String,
				default: 'l'
			},
			/**
			 * label颜色主题
			 */
			labelType: {
				type: String,
				default: 'text'
			},
			/**
			 * label尺寸主题
			 */
			labelSize: {
				type: String,
				default: 'base'
			},
			/**
			 * 右侧图标颜色主题
			 */
			indicatorType: {
				type: String,
				default: 'text'
			},
			/**
			 * 右侧图标尺寸主题
			 */
			indicatorSize: {
				type: String,
				default: 'l'
			},
			/**
			 * placeholder颜色主题
			 */
			placeType: {
				type: String,
				default: 'place'
			},
			/**
			 * placeholder尺寸主题
			 */
			placeSize: {
				type: String,
				default: 'base'
			},
			/**
			 * 键盘adjust-position弹出方式
			 */
			adjust: {
				type: Boolean,
				default: true
			},
			/**
			 * 指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
			 */
			cursorSpacing: {
				type: Number,
				default: 0
			},
			/**
			 * confirm-type
			 */
			confirmType: {
				type: String,
				default: 'done'
			},
			/**
			 * 图标样式
			 */
			iconStyle: {
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
			 * label样式
			 */
			labelStyle: {
				type: String,
				default: ""
			},
			/**
			 * 值样式
			 */
			valueStyle: {
				type: String,
				default: 'flex:1;'
			},
			/**
			 * 右侧图标样式
			 */
			indicatorStyle: {
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
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ""
			},
			/**
			 * 内部各元素之间的空隙
			 */
			space: {
				type: String,
				default: '12rpx'
			},
			/**
			 * placeholder的样式
			 */
			placeStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				// 防止在h5端直接显示null为字符串
				inputValue: this.value||'',
				formatRawValue: this.value||''
			}
		},
		created() {
			if (this.formatable) {
				this.inputValue = this.toFormatText(this.value)
			}
		},
		watch: {
			value(newV) {
				if (this.formatable) {
					if (this.formatRawValue !== newV) {
						this.formatRawValue = newV
						this.inputValue = this.toFormatText(newV)
					}
				} else {
					// change when not the same
					if (this.inputValue !== newV) {
						this.inputValue = newV
					}
				}
			}
		},
		computed: {
			// #ifndef APP-NVUE
			inputBoxHeightStyle() {
				if (this.boxStyle && this.boxStyle.length >= 10) {
					const cssJs = cssToJs(this.boxStyle)
					if (cssJs.height) {
						return `height:${cssJs.height};`
					}
				}
				return ''
			},
			// #endif
			formatable() {
				return this.separator && this.separator.length > 0 && this.format && this.format.length > 0
			},
			showPlaceholder() {
				if (!this.inputValue) {
					return true
				}
				const inStr = this.inputValue + ''
				if (inStr && inStr.length > 0) {
					return false
				}
				return true
			}
		},
		methods: {
			toFocus(e) {
				this.$emit("focus", e)
			},
			toBlur(e) {
				this.$emit("blur", e)
			},
			nFocus() {
				// #ifdef APP-NVUE
				this.$refs['n-input'] && this.$refs['n-input'].focus()
				this.$refs['n-input-1'] && this.$refs['n-input-1'].focus()
				// #endif
			},
			nBlur() {
				// #ifdef APP-NVUE
				this.$refs['n-input'] && this.$refs['n-input'].blur()
				this.$refs['n-input-1'] && this.$refs['n-input-1'].blur()
				// #endif
			},
			toChangeKb(e) {
				this.$emit("keyboardHeightChange", e)
			},
			handleInputedText(e) {
				const _val = e.detail.value || ''
				if (this.formatable) {
					this.inputValue = this.toFormatText(_val)
					this.formatRawValue = this.inputValue.split(this.separator).join("")
					this.$emit("input", this.formatRawValue)
					this.$emit("formated", this.inputValue)
				} else {
					this.inputValue = e.detail.value
					this.$emit("input", e.detail.value)
				}
			},
			handleConfirmText(e) {
				this.$emit("confirm", e.detail.value)
			},
			rightTapped() {
				this.$emit('indicatorClicked')
			},
			toDetail() {
				this.disabled && this.$emit("inputClicked")
			},
			// 这个格式化 使得我们不能输入 separator
			toFormatText(val) {
				let _val = val
				if (this.formatable) {
					const oldVal = val.split(this.separator).join("")
					const valLength = oldVal.length
					const formatLength = this.format.length
					let position = 0
					const valArr = []
					for (const i in this.format) {
						const length = this.format[i]
						if (valLength > position + length) {
							valArr.push(oldVal.substr(position, length))
							position += length
						} else {
							valArr.push(oldVal.substr(position))
							break
						}
					}
					_val = valArr.join(this.separator)
					if (_val.length > this.maxlength) {
						_val = oldVal
					}
				}
				return _val
			}
		}
	}
</script>

<style lang="scss" scoped>
	.n-input {
		&-place {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			
			&-left {
				justify-content: flex-start;
			}
			&-center {
				justify-content: center;
			}
			&-right {
				justify-content: flex-end;
			}
		}
		&-input {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
		}
	}
</style>
