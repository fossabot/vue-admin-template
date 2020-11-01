<template>
	<div class="global-header">
		<div class="header-left" v-if="isMenuInAside" @click="onChangeMenuCollapseStatus">
			<i :class="isMenuCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'" />
		</div>
		<transition name="fade">
			<global-logo class="header-aside" v-if="!isMenuInAside && isLogoShow" />
		</transition>
		<transition name="fade">
			<global-menu class="header-menu" mode="horizontal" v-if="!isMenuInAside" />
		</transition>
		<div class="header-right">@todo</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import GlobalLogo from '../global-logo';
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
			isMenuInAside: (state) => state.layout.isMenuInAside,
			isMenuCollapse: (state) => state.layout.isMenuCollapse,
		}),
	},
	methods: {
		onChangeMenuCollapseStatus() {
			this.$store.dispatch('layout/onChangeMenuCollapseStatus');
		},
	},
};
</script>

<style lang="less" scoped>
.global-header {
	position: relative;
	z-index: 9;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 60px;
	background: #fff;
	border-bottom: 1px solid #ebeef5;
	.header-aside {
		float: left;
		width: @app-aside-width / 1.5;
	}
	.header-menu {
		flex: 1;
	}
}
.header-left {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 60px;
	height: 100%;
	font-size: 26px;
	cursor: pointer;
	transition: all 0.3s linear;

	&:hover {
		background: #ebeef5;
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
