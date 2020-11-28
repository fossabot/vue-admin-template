<template>
	<router-link class="global-logo" to="/">
		<img class="logo" src="../../../assets/logo.png" alt="模板" />
		<transition name="fade">
			<h1 class="title" v-if="!isMenuInAside || (isMenuInAside && !isMenuCollapse)">值核算系统</h1>
		</transition>
	</router-link>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'GlobalLogo',
	computed: {
		...mapState({
			isMenuInAside: (state) => state.layout.isMenuInAside,
			isMenuCollapse: (state) => state.layout.isMenuCollapse,
		}),
	},
	mounted() {
		console.log(this.isMenuInAside, this.isMenuCollapse);
	},
};
</script>

<style lang="less" scoped>
.global-logo {
	display: flex;
	align-items: center;
	justify-content: center;
	height: @app-header-height;
	color: @light-main-font-color;
	cursor: pointer;

	.logo {
		width: 20px;
		height: 20px;
	}
	.title {
		overflow: hidden;
		font-size: 16px;
		font-weight: normal;
		white-space: nowrap;
	}
}
[data-theme='dark'] {
	.global-logo {
		color: @dark-main-font-color;
	}
}
.fade-enter-active,
.fade-leave-active {
	transition: all 0.3s linear;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
