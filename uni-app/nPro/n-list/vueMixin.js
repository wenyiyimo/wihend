export default {
	// #ifndef APP-NVUE
	props: {
		upperThreshold: {
			type: Number,
			default: 50
		},
		lowerThreshold: {
			type: Number,
			default: 50
		},
		scrollWithAnimation: {
			type: Boolean,
			default: true
		},
		refresherEnabled: {
			type: Boolean,
			default: false
		},
		refresherThreshold: {
			type: Number,
			default: 45
		},
		refresherDefaultStyle: {
			type: String,
			default: 'black'
		},
		refresherBackground: {
			type: String,
			default: "#FFF"
		},
		refresherTriggered: {
			type: Boolean,
			default: false
		},
		enableFlex: {
			type: Boolean,
			default: false
		},
		scrollAnchoring: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		onScrollToUpper(e) {
			this.$emit("upper", e)
		},
		onScrollToLower(e) {
			this.$emit("lower", e)
		},
		onRefresherPulling(e) {
			this.$emit("pulling", e)
		},
		onRefresherRefresh(e) {
			this.$emit("refresh", e)
		},
		onRefresherRestore(e) {
			this.$emit("restore", e)
		},
		onRefresherAbort(e) {
			this.$emit("abort", e)
		}
	}
	// #endif
}
