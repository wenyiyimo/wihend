export default {
	data() {
		return {
			leftIcons: [{icon:'arrow-left-bold', style: 'width:44px;height:44px;'}]
		}
	},
	methods: {
		navLeftAction() {
			uni.navigateBack({
				delta: 1
			})
		}
	}
}
