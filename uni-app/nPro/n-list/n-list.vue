<template>
	<!-- #ifndef APP-NVUE -->
	<scroll-view :class="['n-bg-'+bgType]" :style="reverse+mrBoxStyle" :upper-threshold="upperThreshold" :lower-threshold="lowerThreshold" :scroll-into-view="nCurrentView" :scroll-top="nScrollTop" :scroll-with-animation="scrollWithAnimation" :scroll-y="nScrollable" :show-scrollbar="showScrollbar" :enable-back-to-top="enableBackToTop" :refresher-enabled="refresherEnabled" :refresher-threshold="refresherThreshold" :refresher-default-style="refresherDefaultStyle" :refresher-background="refresherBackground" :refresher-triggered="refresherTriggered" :enable-flex="enableFlex" :scroll-anchoring="scrollAnchoring" @scroll="nScroll" @scrolltoupper="onScrollToUpper" @scrolltolower="onScrollToLower" @refresherpulling="onRefresherPulling" @refresherrefresh="onRefresherRefresh" @refresherrestore="onRefresherRestore" @refresherabort="onRefresherAbort">
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<list :class="['n-flex-1', 'n-bg-'+bgType]" :bounce="bounce" :style="reverse+mrBoxStyle" :ref="refName" :scrollable="scrollable" :pagingEnabled="pagingEnabled" :enable-back-to-top="enableBackToTop" :show-scrollbar="showScrollbar" :loadmoreoffset="(nUp.use&&!useLoading)?loadMoreOffset:0" @loadmore="nMoreLoad" @scroll="nScroll">
		<n-refresher-n v-if="nDown.use" ref="n-refresher" :scrollRef="refName" :mainText="refreshMainText" :pullingText="pullingText" :refreshingText="refreshingText" :boxStyle="reverse+refreshStyle" @refresh="nRefresh"></n-refresher-n>
		<cell>
			<view ref="n-list-top"></view>
		</cell>
		<slot></slot>
		<cell>
			<slot name="token"></slot>
		</cell>
		<cell>
			<view ref="n-list-bottom"></view>
		</cell>
		<!-- in android, we must put loading in the last, or it will not trigger loading next page. --> 
		<!-- it's the same in loadMore with loadMoreOffset -->
		<cell v-if="nUp.use&&!useLoading">
			<n-loader :isLoading="nIsUpLoading" :hasMore="nHasMore" :showNoMore="showNoMore" :mainText="loadMainText" :loadingText="loadingText" :noMoreText="noMoreText" :loadingSrc="loadingSrc" :boxStyle="reverse+loadingStyle"></n-loader>
		</cell>
		<n-loader-n v-if="nUp.use&&useLoading" ref="n-loader" :hasMore="nHasMore" :showNoMore="showNoMore" :mainText="loadMainText" :loadingText="loadingText" :noMoreText="noMoreText" :loadingSrc="loadingSrc" :boxStyle="reverse+loadingStyle" @loading="nLoad"></n-loader-n>
	</list>
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
		<view :style="nMrScrollContentStyle" @touchstart="nTouchstartEvent" @touchmove="nTouchmoveEvent" @touchend="nTouchendEvent" @touchcancel="nTouchendEvent">
			<view v-if="nDown.use" :style="nMrRefreshStyle">
				<n-refresher :refreshing="nIsDownLoading" :couldUnLash="nCouldUnLash" :rate="nDownRate" :mainText="refreshMainText" :pullingText="pullingText" :refreshingText="refreshingText" :boxStyle="reverse+refreshStyle"></n-refresher>
			</view>
			<view id="n-list-top" ref="n-list-top"></view>
			<!-- content of scroll -->
			<slot></slot>
			<view><slot name="token"></slot></view>
			<view id="n-list-bottom" ref="n-list-bottom"></view>
			<n-loader v-if="nUp.use" :isLoading="nIsUpLoading" :hasMore="nHasMore" :showNoMore="showNoMore" :mainText="loadMainText" :loadingText="loadingText" :noMoreText="noMoreText" :loadingSrc="loadingSrc" :boxStyle="reverse+loadingStyle"></n-loader>
		</view>
	</scroll-view>
	<!-- #endif -->
</template>

<script>
	import styleMixin from './styleMixin.js'
	import refreshLoadCustom from './custom.js'
	import scrollMixin from './mixin.js'
	import vueMixin from './vueMixin.js'
	import weexActions from './weexActions.js'
	import {getPlatform} from '../utils/system.js'
	
	/**
	 * list
	 * @description 滚动列表
	 * @property {String} refName 自定义ref
	 * @property {Boolean} useLoading = [true|false] 是否启用loading组件，而不是loadmoreoffset触发
	 * @property {Boolean} showScrollbar = [true|false] 是否显示scrollbar
	 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
	 * @property {String} position 定位
	 * @property {String} top 定位的top
	 * @property {String} bottom 定位的bottom
	 * @property {String} boxStyle 外层样式
	 * @property {String} height 只开放非nvue-app下设置高度，nvue-app通过flex来实现高度继承
	 * @property {String} reverse 颠倒列表的样式
	 * @property {String} loadMainText 可以继续加载时的文字提示
	 * @property {String} loadingText 正在加载时的文字提示
	 * @property {String} noMoreText 没有更多时的文字提示
	 * @property {Boolean} showNoMore = [true|false] 是否展示没有更多
	 * @property {String} loadingSrc 加载中的gif图片
	 * @property {String} loadingStyle loading的外层样式
	 * @property {String} refreshMainText 下拉时提示文字
	 * @property {String} pullingText 下拉时提示文字
	 * @property {String} refreshingText 正在刷新的提示文字
	 * @property {String} refreshStyle 刷新组件的外层样式
	 * @property {Number} loadMoreOffset 使用loadmoreoffset时的触发偏移量
	 * @property {Boolean} autoUpdate = [true|false] 是否自动加载第一页数据
	 * @property {Object} down 上提加载的配置
	 * @property {Object} up 上提加载的配置
	 * @event {Function} scroll list 滚动时的 scroll 事件的监听
	 * @event {Function} down 下拉刷新事件
	 * @event {Function} up 上提加载事件
	 * @event {Function} inited 初始化
	 */
	export default {
		name: 'n-list',
		mixins: [styleMixin, refreshLoadCustom, scrollMixin, vueMixin, weexActions],
		props: {
			/**
			 * 是否允许滚动
			 */
			scrollable: {
				type: Boolean,
				default: true
			},
			/**
			 * 自定义ref
			 */
			refName: {
				type: String,
				default: 'n-scroller'
			},
			enableBackToTop: {
				type: Boolean,
				default: false
			},
			// #ifdef APP-NVUE
			/**
			 * 是否启用loading组件，而不是loadmoreoffset触发
			 */
			useLoading: {
				type: Boolean,
				default: false
			},
			/**
			 * 使用loadmoreoffset时的触发偏移量
			 */
			loadMoreOffset: {
				type: Number,
				default: 60
			},
			/**
			 * 是否使用分页模式
			 */
			pagingEnabled: {
				type: Boolean,
				default: false
			},
			/**
			 * 是否开启bounce效果，默认开启
			 */
			bounce: {
				type: Boolean,
				default: true
			},
			// #endif
			/**
			 * 是否自动加载第一页数据
			 */
			autoUpdate: {
				type: Boolean,
				default: false
			},
			/**
			 * 下拉刷新的配置
			 */
			down: {
				type: Object,
				default: ()=>{
					return {
						use: true,
						offset: uni.upx2px(140),
						inRate: 0.8,
						outRate: 0.2
					}
				}
			},
			/**
			 * 上提加载的配置
			 */
			up: {
				type: Object,
				default: ()=>{
					return {
						use: true,
						offset: 80
					}
				}
			}
		},
		created() {
			// config the down/up
			// #ifndef APP-NVUE
			this.nDown = Object.assign({use: true,offset: uni.upx2px(140),inRate: 0.8,outRate: 0.2}, this.down||{use:false})
			this.nUp = Object.assign({use: true,offset: 80}, this.up||{use:false})
			this.nScrollable = this.scrollable
			// #endif
			// #ifdef APP-NVUE
			this.nDown = Object.assign(this.down||{use:false})
			this.nUp = Object.assign(this.up||{use:false})
			this.platform = getPlatform()
			// #endif
			// emit this 会在mp端报错，且不建议
			// this.$emit("inited", this)
			// 注意：如果直接emit，外部监听到inited的时候，还不能通过ref获取到实例
			// this.$emit("inited")
			setTimeout(()=>{
				this.$emit("inited")
			}, 0)
			if (this.autoUpdate) {
				const that = this
				setTimeout(() => {
					// to refresh data
					this.nInitContentList()
				}, 10)
			}
		},
		watch: {
			down(newV) {
				// #ifndef APP-NVUE
				this.nDown = Object.assign({use: true,offset: uni.upx2px(140),inRate: 0.8,outRate: 0.2}, newV||{use:false})
				// #endif
				// #ifdef APP-NVUE
				this.nDown = Object.assign(newV||{use:false})
				// #endif
			},
			up(newV) {
				// #ifndef APP-NVUE
				this.nUp = Object.assign({use: true,offset: 80}, newV||{use:false})
				// #endif
				// #ifdef APP-NVUE
				this.nUp = Object.assign(newV||{use:false})
				// #endif
			},
			// #ifndef APP-NVUE
			scrollable(newV) {
				this.nScrollable = newV
			}
			// #endif
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
</style>
