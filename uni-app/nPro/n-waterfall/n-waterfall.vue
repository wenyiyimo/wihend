<template>
	<!-- #ifndef APP-NVUE -->
	<scroll-view :class="'n-bg-'+bgType" :style="mrBoxStyle" :upper-threshold="upperThreshold" :lower-threshold="lowerThreshold" :scroll-into-view="nCurrentView" :scroll-top="nScrollTop" :scroll-with-animation="scrollWithAnimation" :scroll-y="nScrollable" :show-scrollbar="showScrollbar" :enable-back-to-top="enableBackToTop" :refresher-enabled="refresherEnabled" :refresher-threshold="refresherThreshold" :refresher-default-style="refresherDefaultStyle" :refresher-background="refresherBackground" :refresher-triggered="refresherTriggered" :enable-flex="enableFlex" :scroll-anchoring="scrollAnchoring" @scroll="nScroll" @touchstart="nTouchstartEvent" @touchmove="nTouchmoveEvent" @touchend="nTouchendEvent" @touchcancel="nTouchendEvent" @scrolltoupper="onScrollToUpper" @scrolltolower="onScrollToLower" @refresherpulling="onRefresherPulling" @refresherrefresh="onRefresherRefresh" @refresherrestore="onRefresherRestore" @refresherabort="onRefresherAbort">
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<waterfall :class="['n-flex-1', 'n-bg-'+bgType]" :style="mrBoxStyle" :ref="refName" :show-scrollbar="showScrollbar" :column-count="columnCount" :column-width="columnWidthPx" :column-gap="columnGapPx" :left-gap="leftGapPx" :right-gap="rightGapPx" :loadmoreoffset="(nUp.use&&!useLoading)?loadMoreOffset:0" @loadmore="nMoreLoad" @scroll="nScroll">
		<n-refresher-n v-if="nDown.use" ref="n-refresher" :scrollRef="refName" :mainText="refreshMainText" :pullingText="pullingText" :refreshingText="refreshingText" :boxStyle="refreshStyle" @refresh="nRefresh"></n-refresher-n>
		<header>
			<view ref="n-list-top"></view>
			<slot name="header"></slot>
		</header>
		<slot></slot>
		<header>
			<slot name="footer"></slot>
			<view ref="n-list-bottom"></view>
		</header>
		<!-- in android, we must put loading in the last, or it will not trigger loading next page. --> 
		<!-- it's the same in loadMore with loadMoreOffset -->
		<!-- or we could put the foot-token after loading -->
		<header v-if="nUp.use&&!useLoading">
			<n-loader :isLoading="nIsUpLoading" :hasMore="nHasMore" :showNoMore="showNoMore" :mainText="loadMainText" :loadingText="loadingText" :noMoreText="noMoreText" :loadingSrc="loadingSrc" :boxStyle="loadingStyle"></n-loader>
		</header>
		<n-loader-n v-if="nUp.use&&useLoading" ref="n-loader" :hasMore="nHasMore" :showNoMore="showNoMore" :mainText="loadMainText" :loadingText="loadingText" :noMoreText="noMoreText" :loadingSrc="loadingSrc" :boxStyle="loadingStyle" @loading="nLoad"></n-loader-n>
	</waterfall>
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
		<view :style="nMrScrollContentStyle">
			<view v-if="nDown.use" :style="nMrRefreshStyle">
				<n-refresher :refreshing="nIsDownLoading" :couldUnLash="nCouldUnLash" :rate="nDownRate" :mainText="refreshMainText" :pullingText="pullingText" :refreshingText="refreshingText" :boxStyle="refreshStyle"></n-refresher>
			</view>
			<view id="n-list-top" ref="n-list-top"></view>
			<slot name="header"></slot>
			<!-- content of scroll -->
			<slot></slot>
			<slot name="footer"></slot>
			<view id="n-list-bottom" ref="n-list-bottom"></view>
			<n-loader v-if="nUp.use" :isLoading="nIsUpLoading" :hasMore="nHasMore" :showNoMore="showNoMore" :mainText="loadMainText" :loadingText="loadingText" :noMoreText="noMoreText" :loadingSrc="loadingSrc" :boxStyle="loadingStyle"></n-loader>
		</view>
	</scroll-view>
	<!-- #endif -->
</template>

<script>
	/**
	 * waterfall
	 * @description 瀑布
	 * @property {Boolean} useLoading = [true|false] 是否启用loading组件，而不是loadmoreofset触发
	 * @property {Number} loadMoreOffset 使用loadmoreofset时的触发偏移量
	 * @property {String, Number} columnCount 每一行的栏目数
	 * @property {String} columnWidth 每一栏的宽度
	 * @property {String} columnGap 栏目之间的间距
	 * @property {String} leftGap 内容距离左侧的间距
	 * @property {String} rightGap 内容距离右侧的间距
	 * @property {Boolean} autoUpdate = [true|false] 是否自动加载第一页数据
	 * @property {Object} down 下拉刷新的配置
	 * @property {Object} up 上提加载的配置
	 * @event {Function} scroll list 滚动时的 scroll 事件的监听
	 * @event {Function} down 下拉刷新事件
	 * @event {Function} up 上提加载事件
	 * @event {Function} inited 初始化
	 */
	import styleMixin from '../n-list/styleMixin.js'
	import vueMixin from '../n-list/vueMixin.js'
	import refreshLoadCustom from '../n-list/custom.js'
	import scrollMixin from '../n-list/mixin.js'
	import weexActions from '../n-list/weexActions.js'
	
	import {getPlatform, getPx} from '../utils/system.js'
	
	export default {
		name: 'n-waterfall',
		mixins: [styleMixin, vueMixin, refreshLoadCustom, scrollMixin, weexActions],
		props: {
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
			 * 是否启用loading组件，而不是loadmoreofset触发
			 */
			useLoading: {
				type: Boolean,
				default: false
			},
			/**
			 * 使用loadmoreofset时的触发偏移量
			 */
			loadMoreOffset: {
				type: Number,
				default: 60
			},
			// #endif
			/**
			 * 每一行的栏目数
			 */
			columnCount: {
				type: [String, Number],
				default: 'auto'
			},
			/**
			 * 每一栏的宽度
			 */
			columnWidth: {
				type: String,
				default: 'auto'
			},
			/**
			 * 栏目之间的间距
			 */
			columnGap: {
				type: String,
				default: '0'
			},
			/**
			 * 内容距离左侧的间距
			 */
			leftGap: {
				type: String,
				default: '0'
			},
			/**
			 * 内容距离右侧的间距
			 */
			rightGap: {
				type: String,
				default: '0'
			},
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
		methods: {
		},
		computed: {
			columnWidthPx() {
				if (this.columnWidth === 'auto') {
					return 'auto'
				}
				return getPx(this.columnWidth)
			},
			columnGapPx() {
				return getPx(this.columnGap)
			},
			leftGapPx() {
				return getPx(this.leftGap)
			},
			rightGapPx() {
				return getPx(this.rightGap)
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
