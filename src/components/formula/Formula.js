import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'
  
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }
  
  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false" data-type="inputFormula"></div>
    `
  }
  
  init() {
    super.init()
    this.$formula = this.$root.find('[data-type="inputFormula"]')
    
    this.$on('table:input', (text) => {
      this.$formula.text(text)
    })
  
    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.text())
    })
  }
  
  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }
  
  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    
    if (keys.includes(event.key)){
      event.preventDefault()
      this.$emit('formula:done')
    }
    
  }
  
}
