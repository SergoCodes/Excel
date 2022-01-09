import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {isCell, shouldResize, nextSelector} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/dom'
import {matrix} from '@core/utils'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }
  
  toHTML() {
    return createTable(30)
  }
  
  prepare() {
    this.selection = new TableSelection()
  }
  
  init() {
    super.init()
    
    this.selectCell(this.$root.find('[data-id="0:0"]'))
    
    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })
    
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }
  
  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }
  
  onInput(event) {
    this.$emit('table:input', this.selection.current.text())
  }
  
  onMousedown(event) {
    if (shouldResize(event)) resizeHandler(this.$root, event)
    else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
          .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }
  
  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowDown',
      'ArrowRight',
      'ArrowLeft',
      'ArrowUp'
    ]
    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $active = this.$root.find(nextSelector(key, id))
      this.selectCell($active)
    }
  }
}


