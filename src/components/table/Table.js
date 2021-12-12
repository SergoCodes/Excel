import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'

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
    // if (event.target.dataset) {
    //   console.log('down coordinates:', event.clientX)
    //   this.resizeStart = event.clientX
    //   this.resizeCol = event.target.parentNode
    // }
  }
  
  
  onMouseup(event) {
    // console.log('up coordinates:', event.clientX)
    // let resizeValue = (event.clientX - this.resizeStart)
    // let initialWidth = this.resizeCol.getBoundingClientRect().width
    // console.log(initialWidth)
    // this.resizeCol.style.width = initialWidth + resizeValue + 'px'
  
  }
  
  
}
