"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unique = exports.isObject = exports.isFunction = void 0;
function isFunction(x) {
    return x &&
        {}.toString.call(x) === '[object Function]';
}
exports.isFunction = isFunction;
function isObject(target) {
    const type = typeof target;
    return (target && (type === 'object' || type === 'function')) || false;
}
exports.isObject = isObject;
function unique(arr) {
    return arr.filter((v, i, a) => a.indexOf(v) === i);
}
exports.unique = unique;
