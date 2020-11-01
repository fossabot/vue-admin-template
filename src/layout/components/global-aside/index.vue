<template>
	<div class="global-aside" :class="isMenuCollapse ? 'collapse' : ''">
		<transition name="fade">
			<global-logo v-if="isLogoShow" />
		</transition>
		<el-scrollbar>
			<global-menu />
		</el-scrollbar>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import GlobalLogo from '../global-logo/index';
import GlobalMenu from '../global-menu/index.vue';

export default {
	name: 'GlobalAside',
	components: {
		GlobalLogo,
		GlobalMenu,
	},
	computed: {
		...mapState({
			isLogoShow: (state) => state.layout.isLogoShow,
			isMenuCollapse: (state) => state.layout.isMenuCollapse,
		}),
	},
};
</script>

<style lang="less" scoped>
.global-aside {
	position: fixed;
	top: 0;
	left: 0;
	z-index: @small-z-index;
	box-sizing: border-box;
	width: @app-aside-width;
	height: 100%;
	user-select: none;
	background: @app-aside-bg;
	border-right: solid 1px @app-aside-bg;
	transition: all 0.3s linear;
	&.collapse {
		width: @app-aside-width-collapse;
	}

	/deep/ .el-menu {
		border-right: none;
	}
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s linear;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
