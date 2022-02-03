import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {isCell, shouldResize, nextSelector} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/dom'
import {matrix} from '@core/utils'
import * as actions from '@/redux/actions'
import {CHANGE_TEXT} from '@/redux/types'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

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
    return createTable(30, this.store.getState())
  }
  
  prepare() {
    this.selection = new TableSelection()
  }
  
  init() {
    super.init()
    
    this.selectCell(this.$root.find('[data-id="0:0"]'))
    
    this.$on('formula:input', value => {
      this.selection.current
        .attr('data-value', value)
        .text(parse(value).toString())
      this.updateTextInStore(value)
    })
    
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
    
    this.$on('toolbar:applyStyle', style => {
      this.$dispatch(actions.applyStyles({
        ids: this.selection.currentIds,
        value: style
      }))
      
      this.selection.applyStyle(style)
    })
  }
  
  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }
  
  onInput(event) {
    const text = $(event.target).text()
    this.updateTextInStore(text)
    this.selection.current
      .attr('data-value', text)
  }
  
  async resize() {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }
  
  onMousedown(event) {
    if (shouldResize(event)) this.resize(event)
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
  
  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }
}


