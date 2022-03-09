<script>
  import {retrieveTokenInfo} from '@/common/token.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
      const app = getApp({allowDefault: true})
      retrieveTokenInfo();
      console.log(app);
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*必须的。每个页面公共css */
	@import '@/nPro/base.scss';
	
	/*皮肤示范 */
	@import '@/theme/dark.scss';
	
	/*可选的另一套布局样式 */
	@import '@/nPro/extra.scss';
	
	/* #ifndef APP-NVUE */
	page {
		height: 100%;
	}
	/* #endif */
</style>
