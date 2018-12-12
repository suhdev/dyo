import * as Utility from './Utility.js'
import * as Element from './Element.js'

export default {only: only, count: count, filter: filter, find: find, map: map, forEach: each, toArray: array}

/**
 * @throws {Error} if not a single valid element
 * @param {*} value
 * @return {object?}
 */
export function only (value) {
	return Element.valid(value) ? value : Utility.invariant('Expected single element!')
}

/**
 * @memberof Children
 * @param {*} value
 * @return {number}
 */
export function count (value) {
	var children = 0

	Utility.each(function (value, index) {
		children = index
	}, value, 1)

	return children
}

/**
 * @param {*} value
 * @param {function} callback
 * @return {Array}
 */
export function filter (value, callback) {
	var children = []

	Utility.each(function (value, index) {
		if (callback(value, index)) {
			children.push(value)
		}
	}, value, 0)

	return children
}

/**
 * @param {*} value
 * @param {function} callback
 * @return {*?}
 */
export function find (value, callback) {
	var children = null

	Utility.each(function (value, index) {
		if (callback(value, index)) {
			return children = value
		}
	}, value, 0)

	return children
}

/**
 * @param {*} value
 * @param {function} callback
 * @return {Array}
 */
export function map (value, callback) {
	var children = []

	Utility.each(function (value, index) {
		children[index] = callback(value, index)
	}, value, 0)

	return children
}

/**
 * @param {*} value
 * @param {function} callback
 */
export function each (value, callback) {
	Utility.each(function (value, index) {
		callback(value, index)
	}, value, 0)
}

/**
 * @param {*} value
 * @return {Array}
 */
export function array (value) {
	var children = []

	Utility.each(function (value, index) {
		children[index] = value
	}, value, 0)

	return children
}
