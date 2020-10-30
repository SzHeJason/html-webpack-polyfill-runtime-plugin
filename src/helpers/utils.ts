export function isFunction(x: any): x is (...args: any[]) => any {
  return x &&
    {}.toString.call(x) === '[object Function]'
}

export function isObject(target: any): target is object {
  const type = typeof target;
  return (target && (type === 'object' || type === 'function')) || false;
}

export function unique<T = any>(arr: T[]) {
  return arr.filter((v, i, a) => a.indexOf(v) === i);
}