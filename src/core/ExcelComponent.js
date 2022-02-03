import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.unsubs = []
    this.store = options.store
    this.prepare()
  }
  
  prepare() {}
  
  toHTML() {
    return ''
  }
  
  init() {
    this.initDOMListeners()
  }
  
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubs.push(unsub)
  }
  
  $dispatch(action) {
    this.storeSub = this.store.dispatch(action)
  }
  
  storeChanged() {}
  
  isWatching(key) {
    return this.subscribe.includes(key)
  }
  
  destroy() {
    this.removeDOMListeners()
    this.unsubs.forEach(unsub => unsub())
  }
}
