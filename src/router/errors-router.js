export default [
	{
		path: '/404',
		name: '404',
		meta: { hidden: true },
		component: () => import('@/views/404'),
	},
	{
		path: '*',
		name: '*',
		meta: { hidden: true },
		redirect: '/404',
	},
];
