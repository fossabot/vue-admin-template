export const noop = (args) => args;
export const getType = (value) => Object.prototype.toString.call(value).slice(8, -1);
export const isObject = (value) => getType(value) === 'Object';
export const isEmpty = function (val) {
	if (val === null || val === undefined) return true;

	if (typeof val === 'boolean') return false;

	if (typeof val === 'number') return !val;

	if (val instanceof Error) return val.message === '';

	switch (Object.prototype.toString.call(val)) {
		case '[object String]':
		case '[object Array]':
			return !val.length;
		case '[object File]':
		case '[object Map]':
		case '[object Set]':
			return !val.size;
		case '[object Object]':
			return !Object.keys(val).length;
		default:
			return false;
	}
};

export function objToStr(obj) {
	return Object.entries(obj)
		.reduce((res, [key, value]) => {
			res.push(`${key}=${value}`);
			return res;
		}, [])
		.join('&');
}

export function filterUndefinedNull(obj) {
	if (!isObject(obj)) return obj;

	const res = {};

	Object.keys(obj).forEach((key) => {
		if (obj[key] === undefined || obj[key] === null) return;

		res[key] = obj[key];
	});

	return res;
}
