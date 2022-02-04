import {ExcelComponent} from '@core/ExcelComponent'
import * as actions from '@/redux/actions'
import {defaultTitle} from '@/constants'
import {dataType, debounce} from '@core/utils'
import {$} from '@core/dom'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'excel__header'
  
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }
  
  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }
  
  onInput(event) {
    this.$dispatch(actions.changeTitle(event.target.value))
  }
  
  onClick(event) {
    const button = $(event.target).data.button
    if (button === 'delete') {
      const decision = confirm('Really?')
      
      if (decision){
        localStorage.removeItem(ActiveRoute.path)
        ActiveRoute.navigate('')
      }
      
    } else if (button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
  
  toHTML() {
    return this.createHeader()
  }
  
  createHeader() {
    const title = this.store.getState().title || defaultTitle
    return `
      <input type="text" class="input" value="${title}" />

      <div>

        <div class="button" data-button="delete">
          <i class="material-icons" data-button="delete">delete</i>
        </div>

        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>

      </div>
    `
  }
}
