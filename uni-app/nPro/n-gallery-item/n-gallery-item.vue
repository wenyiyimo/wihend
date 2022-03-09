<template>
	<view class="n-flex-row n-overflow-hidden" :style="mrItemStyle+mrFirstMargin+mrLastMargin" @tap="clicked">
		<view ref="n-gallery-item" class="n-overflow-hidden" :style="mrItemStyle">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'n-gallery-item',
		inject: ['nGallery'],
		data() {
			return {
				index: 0,
				isFirst: false,
				isLast: false
			}
		},
		created() {
			if (this.nGallery.children) {
				this.index = this.nGallery.children.length
				this.nGallery.children.push(this)
			}
		},
		computed: {
			mrItemStyle() {
				if (!this.nGallery) {
					return ''
				}
				return this.nGallery.mrItemStyle
			},
			mrFirstMargin() {
				if (!this.nGallery) {
					return ''
				}
				return this.isFirst ? this.nGallery.firstMargin : ''
			},
			mrLastMargin() {
				if (!this.nGallery) {
					return ''
				}
				return this.isLast ? this.nGallery.lastMargin : ''
			}
		},
		methods: {
			clicked() {
				this.nGallery.$emit('selected', this.index)
			},
			initLayout() {
				if (this.index === 0) {
					this.isFirst = true
				}
				if (this.index === this.nGallery.children.length - 1) {
					this.isLast = true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
