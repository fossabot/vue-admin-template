import Vue from 'vue';
import VueRouter from 'vue-router';
import BaseLayout from '../layout/index.vue';

import errorsRouter from './errors-router';

Vue.use(VueRouter);

/**
 * 只有当children.length >= 2时，才会出现sub-menu
 * meta: Object
 * meta.roles {[]} 权限。需要固定的权限才可以显示。
 * meta.title {String} 显示的标题。菜单栏、面包屑。
 * meta.name {String} keep-alive缓存的组件名。
 * meta.icon {String} 显示的icon。
 * meta.pin {Boolean} 是否固定在标签栏。默认: false。
 * meta.cache {Boolean} 是否被keep-alive缓存，配置此项必须配置meta.name。默认: false。
 * @type {*[]}
 */
export const routes = [
	{
		path: '/',
		name: '工作台',
		component: BaseLayout,
		redirect: '/dashboard',
		meta: { title: 'Icons', name: 'Dashboard', icon: 'el-icon-s-platform', cache: true },
		children: [
			{
				path: '/dashboard',
				name: '工作台',
				meta: { title: 'Icons', name: 'Dashboard', icon: 'el-icon-s-platform', pin: true, cache: true },
				component: () => import('@/views/dashboard/index.vue'),
			},
		],
	},
	{
		path: '/about',
		name: '组件',
		component: BaseLayout,
		redirect: '/components/index',
		meta: { title: 'Icons', icon: 'el-icon-s-home', cache: true, name: 'Test' },
		children: [
			{
				path: '/about/auth',
				name: 'Icons1',
				meta: { title: 'Icons', icon: 'el-icon-s-home', pin: true, cache: true, name: 'Test' },
				component: () => import('@/views/Home.vue'),
			},
			{
				path: '/about/auth2',
				name: 'Icons1',
				meta: { title: 'Icons', icon: 'icon', cache: true },
				component: () => import('@/views/Home.vue'),
			},
		],
	},
	{
		path: '/refresh',
		component: BaseLayout,
		meta: { hidden: true },
		children: [
			{
				path: '/refresh/:path(.*)',
				meta: { hidden: true },
				component: () => import('@/views/refresh/index.vue'),
			},
		],
	},
	...errorsRouter,
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
