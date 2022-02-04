import {Page} from '@core/Page'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {debounce, storage} from '@core/utils'
import {normalizeInitialState} from '@/redux/initialState'

function excelStorageName(param) {
  return `excel:` + param
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params
      ? this.params
      : excelStorageName(Date.now().toString())
    
    const state = storage(params)
    const store = createStore(rootReducer, normalizeInitialState(state))
    
    const stateListener = debounce(state => {
        storage(params, state)
    })
    
    store.subscribe(stateListener, 300)
    
    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })
    
    return this.excel.getRoot()
  }
  
  afterRender() {
    this.excel.init()
  }
  
  destroy() {
    this.excel.destroy()
  }
}
