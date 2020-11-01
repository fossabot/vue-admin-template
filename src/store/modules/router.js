import { routes } from '@/router';
import { travelRoutes } from '@/utils';

export default {
	namespaced: true,
	state: {
		routes: travelRoutes(routes),
	},
	mutations: {},
	actions: {},
};
