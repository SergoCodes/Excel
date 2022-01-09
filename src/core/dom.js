class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }
  
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML
  }
  
  clear() {
    this.html('')
    return this
  }
  
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
  
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }
  
  closest(selector) {
    return $(this.$el.closest(selector))
  }
  
  getCoords() {
    return this.$el.getBoundingClientRect()
  }
  
  get data() {
    return this.$el.dataset
  }
  
  get style() {
    return this.$el.style
  }
  
  set style(value) {
    return this.$el.style = value
  }
  
  css(styles = {}) {
    Object.entries(styles).forEach(([key, value]) => {
      this.$el.style[key] = value
    })
  }
  
  addClass(className) {
    this.$el.classList.add(className)
  }
  
  removeClass(className) {
    this.$el.classList.remove(className)
  }
  
  find(selector) {
    return $(this.$el.querySelector(selector))
  }
  
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  
  focus(){
    this.$el.focus()
    return this
  }
  
  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        row: +parsed[1],
        col: +parsed[0]
      }
    }
    return this.data.id
  }
  
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
