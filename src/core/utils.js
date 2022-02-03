import {defaultStyles} from '@/constants'

export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
  if (start > end) {[start, end] = [end, start]}
  return new Array(end - start + 1)
    .fill('')
    .map((_, i) => start + i)
}

export function matrix($target, $current) {
  const current = $current.id(true)
  const target = $target.id(true)
  
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)
  
  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${col}:${row}`))
    return acc
  }, [])
}

export function storage(key, data = null) {
  if (!data) return JSON.parse(localStorage.getItem(key))
  return localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  
  return a === b
}

export function camelToDashCase(str) {
  return str.replace(/[A-Z]/g, m => "-" + m.toLowerCase())
}

export function toInlineStyles(styles) {
  return Object.keys(styles)
    .map(style => `${camelToDashCase(style)}:${styles[style]}`)
    .join('; ')
}

export function debounce(fn, wait) {
  let timeout
  return function(...args) {
    const later = () => {
      clearTimeout(timeout)
      fn.apply(this, args)
    }
    
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
