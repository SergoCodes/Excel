import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {isCell, shouldResize} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/dom'
import {matrix} from '@core/utils'
import {logPlugin} from '@babel/preset-env/lib/debug'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  
  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'keydown']
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
    
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
  }
  
  onMousedown(event) {
    if (shouldResize(event)) resizeHandler(this.$root, event)
    else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
          .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else this.selection.select($target)
    }
  }
  
  onKeydown(event) {
    const keys = ['Enter',
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
      const $active = this.$root.find(nextSelector(event.key, id))
      this.selection.select($active)
    }
  }
}

function nextSelector(key, {col, row}) {
  const MIN_VALUE = 0
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      break
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
      break
  }
  return `[data-id="${col}:${row}"]`
}
