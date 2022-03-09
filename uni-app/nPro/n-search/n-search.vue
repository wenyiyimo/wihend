<template>
	<view bubble="true" @click="toDetail">
		<view v-if="position==='left'&&fixIcon" :class="['n-search', 'n-bg-'+bgType, 'n-border-'+border, 'n-radius-'+radius, 'n-height-'+height, 'n-flex-row', 'n-align-center']" :style="boxStyle">
			<n-icon v-if="icon&&icon.length>0" :name="icon" :type="showPlaceholder?placeIconType:iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="'margin-right:'+iconTextSpace+';'" @iconClicked="toDetail"></n-icon>
			<view :class="['n-flex-1', 'n-position-relative', 'n-height-'+height]" :style="mrFixBoxStyle">
				<view :class="['n-search-place', 'n-flex-row', 'n-align-center']" :style="placeBoxStyle">
					<text :class="['n-flex-1', 'n-color-'+placeType, 'n-size-'+placeSize]" :style="placeStyle">{{showPlaceholder?placeholder:''}}</text>
				</view>
				<view :class="['n-search-input', 'n-flex-row', 'n-align-center']" :style="valueBoxStyle">
					<input ref="n-input" :disabled="disabled" :value="inputValue" :focus="focus" :cursor-spacing="cursorSpacing" :adjust-position="adjust" :confirm-type="confirmType" :class="['n-flex-1', 'n-color-'+valueType, 'n-size-'+valueSize]" :style="valueStyle" @input="toInput" @confirm="toConfirm" @focus="toFocus" @blur="toBlur" @keyboardheightchange="toChangeKb" />
				</view>
			</view>
			<slot name="extra"></slot>
		</view>
		<view v-else :class="['n-search', 'n-bg-'+bgType, 'n-border-'+border, 'n-radius-'+radius, 'n-height-'+height, 'n-align-center', 'n-wrap-nowrap']" :style="mrBoxStyle">
			<view :class="['n-search-place', 'n-flex-row', 'n-align-center', 'n-search-place-'+position]" :style="mrPlaceBoxStyle">
				<view v-if="showPlaceholder&&icon&&icon.length>0" :style="{'margin-right': iconTextSpace}">
					<n-icon :name="icon" :type="placeIconType" :size="iconSize" :iconStyle="iconStyle" @iconClicked="toDetail"></n-icon>
				</view>
				<text :class="['n-color-'+placeType, 'n-size-'+placeSize]" :style="placeStyle">{{showPlaceholder?placeholder:''}}</text>
			</view>
			<view :class="['n-search-input', 'n-flex-row', 'n-align-center']" :style="mrValueBoxStyle">
				<input ref="n-input-1" :disabled="disabled" :value="inputValue" :focus="focus" :cursor-spacing="cursorSpacing" :adjust-position="adjust" :confirm-type="confirmType" :class="['n-flex-1', 'n-search-input-'+position, 'n-color-'+valueType, 'n-size-'+valueSize]" :style="valueStyle" @input="toInput" @confirm="toConfirm" @focus="toFocus" @blur="toBlur" @keyboardheightchange="toChangeKb" />
				<slot name="extra"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * search
	 * @description 搜索输入框
	 * @property {String,Number} value 值
	 * @property {String} icon 图标
	 * @property {String} placeholder placeholder
	 * @property {String} position 内容位置：left/center
	 * @property {Boolean} focus = [true|false] 是否focus
	 * @property {Boolean} adjust = [true|false] 键盘弹出方式：adjust-position
	 * @property {Number} cursorSpacing 指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
	 * @property {Boolean} disabled = [true|false] 是否禁用
	 * @property {String} confirmType confirm-type
	 * @property {Boolean} fixIcon = [true|false] 是否固定图标。position为left时可以将icon固定在左侧
	 * @property {String} iconTextSpace 图标与文字的间距
	 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景色主题
	 * @property {String} valueType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 内容颜色主题
	 * @property {String} placeIconType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] placeholder显示时图标的颜色主题
	 * @property {String} iconType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 图标的颜色主题
	 * @property {String} placeType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] placeholder的颜色主题
	 * @property {String} height = [ss|s|base|l|ll] 高度主题
	 * @property {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
	 * @property {String} radius = [ss|s|base|l|ll|none] 圆角主题
	 * @property {String} space 左右padding
	 * @property {String} valueSize = [ss|s|base|l|ll] 内容的尺寸主题
	 * @property {String} iconSize = [ss|s|base|l|ll] 图标的尺寸主题
	 * @property {String} placeSize = [ss|s|base|l|ll] placeholder的尺寸主题
	 * @property {String} boxStyle 外层样式
	 * @property {String} iconStyle 图标样式
	 * @property {String} placeStyle placeholder的样式
	 * @property {String} valueBoxStyle 内容的外层样式
	 * @property {String} valueStyle 内容的样式
	 * @property {String} placeBoxStyle placeholder的外层样式
	 * @event {Function} input 当键盘输入时，触发input事件
	 * @event {Function} confirm 点击完成按钮时触发
	 * @event {Function} focus 输入框聚焦时触发
	 * @event {Function} blur 输入框失去焦点时触发
	 * @event {Function} keyboardHeightChange 键盘高度发生变化的时候触发此事件
	 */
	import {cssToJs} from '../utils/utils.js'
	
	export default {
		name: 'n-search',
		props: {
			/**
			 * 值
			 */
			value: {
				type: [String, Number],
				default: ''
			},
			/**
			 * 图标
			 */
			icon: {
				type: String,
				default: 'search'
			},
			/**
			 * placeholder
			 */
			placeholder: {
				type: String,
				default: "输入内容开始搜索"
			},
			/**
			 * 内容位置：left/center
			 */
			position: {
				type: String,
				default: 'left'
			},
			/**
			 * 是否focus
			 */
			focus: {
				type: Boolean,
				default: false
			},
			/**
			 * 键盘弹出方式：adjust-position
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
			 * 是否禁用
			 */
			disabled: {
				type: Boolean,
				default: false
			},
			/**
			 * confirm-type
			 */
			confirmType: {
				type: String,
				default: 'search'
			},
			/**
			 * 是否固定图标。position为left时可以将icon固定在左侧
			 */
			fixIcon: {
				type: Boolean,
				default: false
			},
			/**
			 * 图标与文字的间距
			 */
			iconTextSpace: {
				type: String,
				default: '12rpx'
			},
			/**
			 * 背景色主题
			 */
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * 内容颜色主题
			 */
			valueType: {
				type: String,
				default: 'text'
			},
			/**
			 * placeholder显示时图标的颜色主题
			 */
			placeIconType: {
				type: String,
				default: 'place'
			},
			/**
			 * 图标的颜色主题
			 */
			iconType: {
				type: String,
				default: 'text'
			},
			/**
			 * placeholder的颜色主题
			 */
			placeType: {
				type: String,
				default: 'place'
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
				default: 'all'
			},
			/**
			 * 圆角主题
			 */
			radius: {
				type: String,
				default: 'll'
			},
			/**
			 * 左右padding
			 */
			space: {
				type: String,
				default: '32rpx'
			},
			/**
			 * 内容的尺寸主题
			 */
			valueSize: {
				type: String,
				default: ''
			},
			/**
			 * 图标的尺寸主题
			 */
			iconSize: {
				type: String,
				default: 'l'
			},
			/**
			 * placeholder的尺寸主题
			 */
			placeSize: {
				type: String,
				default: ''
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: 'padding-left:32rpx;padding-right:32rpx;'
			},
			/**
			 * 图标样式
			 */
			iconStyle: {
				type: String,
				default: ''
			},
			/**
			 * placeholder的样式
			 */
			placeStyle: {
				type: String,
				default: ''
			},
			/**
			 * 内容的外层样式
			 */
			valueBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 内容的样式
			 */
			valueStyle: {
				type: String,
				default: ''
			},
			/**
			 * placeholder的外层样式
			 */
			placeBoxStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				inputValue: this.value
			}
		},
		computed: {
			showPlaceholder() {
				return !this.inputValue || this.inputValue.length === 0
			},
			mrBoxStyle() {
				return `padding-left:${this.space};padding-right:${this.space};` + this.boxStyle
			},
			mrValueBoxStyle() {
				return `padding-left:${this.space};padding-right:${this.space};` + this.valueBoxStyle
			},
			mrPlaceBoxStyle() {
				return `padding-left:${this.space};padding-right:${this.space};` + this.placeBoxStyle
			},
			mrFixBoxStyle() {
				if (this.fixIcon) {
					if (this.boxStyle && this.boxStyle.length >= 10) {
						const cssJs = cssToJs(this.boxStyle)
						if (cssJs.height) {
							return `height:${cssJs.height};`
						}
					}
				}
				return ''
			}
		},
		watch: {
			value(newV) {
				this.inputValue = newV
			}
		},
		methods: {
			toInput(e) {
				this.inputValue = e.detail.value
				this.$emit("input", e.detail.value)
			},
			toConfirm(e) {
				this.$emit("confirm", e.detail.value)
			},
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
			toDetail() {
				this.disabled && this.$emit("searchClicked")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.n-search {
		position: relative;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
		
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
		}
		&-input {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			
			&-left {
				text-align: left;
			}
			&-center {
				text-align: center;
			}
		}
	}
</style>
