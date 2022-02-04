import {clone, storage} from '@core/utils'
import {defaultStyles, defaultTitle} from '@/constants'

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  currentText: '',
  dataState: {},
  currentStyles: defaultStyles,
  stylesState: {},
  openedDate: new Date().toJSON()
}

const normalize = state => {
  return {
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
  }
}

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}

