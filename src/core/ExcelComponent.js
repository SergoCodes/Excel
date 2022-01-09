import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubs = []
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
  
  destroy() {
    this.removeDOMListeners()
    this.unsubs.forEach(unsub => unsub())
  }
}
