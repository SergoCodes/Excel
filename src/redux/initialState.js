import {storage} from '@core/utils'
import {defaultStyles, defaultTitle} from '@/constants'

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  currentText: '',
  dataState: {},
  currentStyles: defaultStyles,
  stylesState: {}
}

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState

