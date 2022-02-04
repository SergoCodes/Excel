import {ActiveRoute} from '@core/routes/ActiveRoute'
import {$} from '@core/dom'

export class Router {
  constructor(selector, routes) {
    if (!selector) throw new Error('selector is not provided')
    
    this.routes = routes
    this.$placeholder = $(selector)
    
    this.pageLoadHandler = this.pageLoadHandler.bind(this)
    
    this.init()
    
    this.currentPage = null
  }
  
  init() {
    window.addEventListener('hashchange', this.pageLoadHandler)
    this.pageLoadHandler()
  }
  
  pageLoadHandler() {
    if (this.currentPage) this.currentPage.destroy()
    this.$placeholder.clear()
  
    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard
    
    this.currentPage = new Page(ActiveRoute.path)
    this.$placeholder.append(this.currentPage.getRoot())
    
    this.currentPage.afterRender()
  }
  
  destroy() {
    window.removeEventListener('hashchange', this.pageLoadHandler)
  }
}
