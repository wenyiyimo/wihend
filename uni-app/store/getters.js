export default {
	// i18n
	language: state => state.i18n.language,
	// theme
	theme: state => state.theme.theme,
	// common
	// common
	pcs: state => state.common.pcs,
	pcas: state => state.common.pcas,
	cities: state => state.common.cities,
	areas: state => state.common.areas,
	isLoadingPcs: state => state.common.isLoadingPcs,
	isLoadingPcas: state => state.common.isLoadingPcas,
	isLoadingCities: state => state.common.isLoadingCities,
	// user
	hasLogedIn: state => state.user.hasLogedIn,
  userInfo: state => state.user.userInfo
}
