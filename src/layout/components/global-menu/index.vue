<template>
	<el-menu
		class="global-menu"
		:mode="mode"
		:default-active="active"
		:collapse="isMenuCollapse"
		:background-color="isMenuInAside ? '#1d1e23' : '#ffffff'"
		:active-text-color="isMenuInAside ? '#ffd04b' : '#0085fa'"
		:text-color="isMenuInAside ? 'rgba(255, 255, 255, 0.7)' : '#333'"
		@open="onHandleOpen"
		@close="onHandleClose"
		@select="onHandleSelect"
	>
		<menu-item v-for="route in routes" :key="route.path" :route="route" />
	</el-menu>
</template>

<script>
import { mapState } from 'vuex';
import MenuItem from './menu-item.vue';

export default {
	name: 'GlobalMenu',
	props: {
		mode: String,
		default() {
			return 'vertical';
		},
	},
	data() {
		return {
			active: '/',
		};
	},
	components: { MenuItem },
	computed: {
		...mapState({
			routes: (state) => state.router.routes,
			isMenuInAside: (state) => state.layout.isMenuInAside,
			isMenuCollapse: (state) => state.layout.isMenuCollapse,
		}),
	},
	mounted() {},
	watch: {
		$route: {
			immediate: true,
			handler(route) {
				this.active = route.path;
			},
		},
	},
	methods: {
		onHandleOpen(index, indexPath) {
			console.log(index, indexPath);
		},
		onHandleClose(index, indexPath) {
			console.log(index, indexPath);
		},
		onHandleSelect(index, indexPath) {
			if (this.active === index) {
				return;
			}
			this.active = index;
			this.$router.push(index);
			console.log(index, indexPath);
		},
	},
};
</script>

<style lang="less" scoped>
.global-menu.el-menu.el-menu--horizontal {
	box-sizing: border-box;
	border-bottom-width: 0;
}
</style>
