import {APPLY_STYLES, CHANGE_STYLES, CHANGE_TEXT, CHANGE_TITLE, TABLE_RESIZE} from '@/redux/types'

export function rootReducer(state, action) {
  let prevState
  let field
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      return {...state, [field]: value(state, action, field)}
    case CHANGE_TEXT:
      field = 'dataState'
      return {...state, currentText: action.data.value, [field]: value(state, action, field)}
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}
    case APPLY_STYLES:
      field = 'stylesState'
      prevState = state[field] || {}
      action.data.ids.forEach(id =>{
        prevState[id] = {...prevState[id], ...action.data.value}
      } )
      return {...state,
        [field]: prevState,
        currentStyles: {...state.currentStyles, ...action.data.value}
      }
    case CHANGE_TITLE:
      return {...state, title: action.data}
    default: return state
  }
}

function value(state, action, field) {
  const value = state[field] || {}
  value[action.data.id] = action.data.value
  return value
}
