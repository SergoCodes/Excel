import {capitalize} from '@core/utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root in DomListener class')
    }
    this.$root = $root
    this.listeners = listeners
    this.methods = {}
  }
  
  initDOMListeners() {
    // eslint-disable-next-line max-len
    // this.listeners.forEach(listener => this.$root.$el.addEventListener(listener,
    //     this['on' + listener.charAt(0).toUpperCase() + listener.slice(1)]
    // ))
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(
            `Method ${method} is not implemented in ${name} Component`
        )
      }
      this.methods[listener] = this[method].bind(this)
      this.$root.on(listener, this.methods[listener])
    })
    
    // console.log(this.$root)
  }
  
  removeDOMListeners() {
    this.listeners.forEach(listener => {
      this.$root.off(listener, this.methods[listener])
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
