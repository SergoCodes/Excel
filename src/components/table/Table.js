import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  
  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mouseup']
    })
  }
  
  toHTML() {
    return createTable(30)
  }
  
  
  
  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
    }
  }
  
  
  onMouseup(event) {
  
  }
  
  
}
