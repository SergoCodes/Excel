import {APPLY_STYLES, CHANGE_STYLES, CHANGE_TEXT, CHANGE_TITLE, TABLE_RESIZE, UPDATE_DATE} from '@/redux/types'

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  }
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data
  }
}

export function updateDate() {
  return {
    type: UPDATE_DATE
  }
}

export function applyStyles(data) {
  return {
    type: APPLY_STYLES,
    data
  }
}

export function changeTitle(data) {
  return {
    type: CHANGE_TITLE,
    data
  }
}
