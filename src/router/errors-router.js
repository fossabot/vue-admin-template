export default [
	{
		path: '/errors/403',
		name: '403',
		meta: { hidden: true },
		component: () => import('@/views/errors/403'),
	},
	{
		path: '/errors/404',
		name: '404',
		meta: { hidden: true },
		component: () => import('@/views/errors/404'),
	},
	{
		path: '*',
		name: '*',
		meta: { hidden: true },
		redirect: '/errors/404',
	},
];
