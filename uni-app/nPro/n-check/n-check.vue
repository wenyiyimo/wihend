<template>
	<view :class="['n-bg-'+bgType, 'n-border-'+border, 'n-radius-'+radius]" :style="boxStyle">
		<slot></slot>
	</view>
</template>

<script>
	/**
	 * check
	 * @description 可自定义内容的单多选
	 * @property {Array} value 初始值/绑定值
	 * @property {Number} limits 限制最多可选数量. 0表示不限制
	 * @property {Boolean} disabled = [true|false] 是否全局禁用
	 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
	 * @property {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
	 * @property {String} radius = [ss|s|base|l|ll|none] 圆角主题
	 * @property {String} boxStyle 外层样式
	 * @event {Function} input 输入事件
	 * @event {Function} change 更改事件
	 * @event {Function} overed 超出限制最大选择数limits触发
	*/
	export default {
		name: 'n-check',
		props: {
			/**
			 * 初始值/绑定值
			 */
			value: {
				type: Array,
				default: ()=>{
					return []
				}
			},
			/**
			 * 限制最多可选数量. 0表示不限制
			 */
			limits: {
				type: Number,
				default: 0
			},
			/**
			 * 是否全局禁用
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
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			}
		},
		provide() {
			return {
				mCheck: this
			}
		},
		// 先父组件created，然后是子组件created，而且子组件created是有顺序的，同步created
		// 先子组件mounted，然后是父组件mounted
		created() {
		},
		methods: {
			toSelect(val) {
				if (this.disabled) {
					return
				}
				const value = Object.assign([], this.value)
				const idx = value.indexOf(val)
				const isToCheck = idx < 0
				// 检测是否超出选择
				if (this.limits > 0 && isToCheck) {
					// limits为1的时候允许直接跳转（从这个变成选择另一个）
					if (value.length >= this.limits && this.limits !== 1) {
						this.$emit("overed")
						return
					}
				}
				let _vals = []
				// limits为1的时候，直接切换状态或者清空选中
				if (this.limits === 1) {
					if (isToCheck) {
						_vals = [val]
					} else {
						_vals = []
					}
				} else {
					if (isToCheck) {
						value.push(val)
						_vals = value
					} else {
						value.splice(idx, 1)
						_vals = value
					}
				}
				this.$emit('input', _vals)
				this.$emit('change', _vals)
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
