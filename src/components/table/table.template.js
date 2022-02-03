import {defaultStyles} from '@/constants'
import {camelToDashCase, toInlineStyles} from '@core/utils'
import {parse} from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function createCol(char, col, width) {
  return `
    <div
      class="column"
      data-type="resizable"
      data-col="${col}"
      style="width: ${width}"
    >
      ${char}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}


function createCell(row){
  return function (_, col, width, state) {
    const id = `${col}:${row}`
    const data = state.dataState[id] || ''
    const styles = toInlineStyles({...defaultStyles, ...state.stylesState[id]})
      return `
        <div
          class="cell"
          data-type="cell"
          data-col="${col}"
          data-id="${col}:${row}"
          style="${styles}; width: ${width}"
          data-value="${data}"
          contenteditable
        >
        ${parse(data)}
        </div>
      `
  }
}

function createRow(content, number, height) {
  const resize = number ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable" data-row="${number}" style="height: ${height}">
      <div class="row-info">
         ${number ? number : ''}
         ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(index + CODES.A)
}

function getWidth(col, state) {
  return (state[col] || DEFAULT_WIDTH) + 'px'
}

function getHeight(row, state) {
  return (state[row] || DEFAULT_HEIGHT) + 'px'
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map((char, col) => createCol(char, col, getWidth(col, state.colState)))
    .join('')
  
  rows.push(createRow(cols))
  
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map((_, col) => createCell(row)(_, col, getWidth(col, state.colState), state))
      .join('')
    
    rows.push(createRow(cells, row+1, getHeight(row+1, state.rowState)))
  }
  
  return rows.join('')
}
