export const noop = (args) => args;
export const getType = (value) => Object.prototype.toString.call(value).slice(8, -1);
export const isString = (value) => getType(value) === 'String';
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

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
export function find(list, f) {
	return list.filter(f)[0];
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy(obj, cache = []) {
	// just return if obj is immutable value
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}

	// if obj is hit, it is in circular structure
	const hit = find(cache, (c) => c.original === obj);
	if (hit) {
		return hit.copy;
	}

	const copy = Array.isArray(obj) ? [] : {};
	// put the copy into cache at first
	// because we want to refer it in recursive deepCopy
	cache.push({
		original: obj,
		copy,
	});

	Object.keys(obj).forEach((key) => {
		copy[key] = deepCopy(obj[key], cache);
	});

	return copy;
}
