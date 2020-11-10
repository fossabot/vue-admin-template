export default {
	namespaced: true,
	state: {
		isShowSetting: true,
		isFixedHeader: true,
		isShowTabsView: true,
		isLogoShow: true,
		isMenuInAside: false,
		isMenuCollapse: false,
	},
	mutations: {
		SET_HEADER_STATUS(state) {
			state.isFixedHeader = !state.isFixedHeader;
		},
		SET_TABS_VIEW_STATUS(state) {
			state.isShowTabsView = !state.isShowTabsView;
		},
		SET_LOGO_VISIBLE_STATUS(state) {
			state.isLogoShow = !state.isLogoShow;
		},
		SET_MENU_POSITION(state) {
			state.isMenuInAside = !state.isMenuInAside;
		},
		SET_MENU_CCOLLPASE_STATUS(state) {
			state.isMenuCollapse = !state.isMenuCollapse;
		},
	},
	actions: {
		onChangeHeaderStatus({ commit }) {
			commit('SET_HEADER_STATUS');
		},
		onCHangeTabsViewStatus({ commit }) {
			commit('SET_TABS_VIEW_STATUS');
		},
		onChangeLogoVisibleStatus({ commit }) {
			commit('SET_LOGO_VISIBLE_STATUS');
		},
		onChangeMenuPosition({ commit }) {
			commit('SET_MENU_POSITION');
		},
		onChangeMenuCollapseStatus({ commit }) {
			commit('SET_MENU_CCOLLPASE_STATUS');
		},
	},
};
