export function isFunction(x: any): x is (...args: any[]) => any {
  return x &&
    {}.toString.call(x) === '[object Function]'
}

export function isObject(target: any): target is Record<string, unknown> {
  const type = typeof target;
  return (target && (type === 'object' || type === 'function')) || false;
}

export function unique<T = any>(arr: T[]) {
  return arr.filter((v, i, a) => a.indexOf(v) === i);
}

export function isString(target: any): target is string {
  return Object.prototype.toString.call(target) === '[object String]';
}