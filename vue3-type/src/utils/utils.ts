/**
 *  对象深拷贝
 */
export function deepMerge(target: any, ...sources: any[]): any {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isType('Object',target) && isType('Object',source)) {
    for (const key in source) {
      if (isType('Object',source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
}


/**
 * 判断给定的是否为空对象
 * @param {Object} obj
 */
export function isPlainObject(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 函数防抖 (只执行最后一次点击)
 */
export  const Debounce = (func: Function, wait: number, immediate: boolean = false) => {
  let timeout: any
  /**
   * return function 可以加个参数，就叫 this，这个在 ts 里是一个用来描述 function 内 this 的类型的方式，不是实际的参数
   * */
  return function (this:any) {
    const context = this
    const args = arguments
    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

/**
 * 函数节流
 */
export const Throttle = (fn: Function, delay: number) => {
  let timer: any = null
  return function (this:any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}


/**
 * 判断类型 Object、Array、Boolean、Function
 * */
export function isType(type: string, obj: any): boolean {
  return Object.prototype.toString.call(obj) === `[object ${type}]`
}




