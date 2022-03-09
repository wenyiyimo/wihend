<template>
	<view :class="['n-bg-'+bgType, 'n-flex-'+flex, 'n-justify-'+justify, 'n-align-'+align, 'n-border-'+border, 'n-radius-'+radius]" :style="'height:'+heightPx+'px;'+boxStyle">
		<slot></slot>
	</view>
</template>

<script>
	/**
	 * height
	 * @description 高度
	 * @property {String} flex 布局方式
	 * @property {String} justify justify主题
	 * @property {String} align align主题
	 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
	 * @property {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
	 * @property {String} radius = [ss|s|base|l|ll|none] 圆角主题
	 * @property {String} height 链式高度：status-nav-32rpx
	 * @property {String} boxStyle 外层样式
	 */
	import {getHeight} from '../utils/system.js'
	
	export default {
		name: 'n-height',
		props: {
			/**
			 * 布局方式
			 */
			flex: {
				type: String,
				default: 'column'
			},
			/**
			 * justify主题
			 */
			justify: {
				type: String,
				default: ''
			},
			/**
			 * align主题
			 */
			align: {
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
			 * 链式高度：status-nav-32rpx
			 */
			height: {
				type: String,
				default: '0'
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
			heightPx() {
				return getHeight(this.height)
			}
		}
	}
</script>

<style>
</style>
