const CODES = {
  A: 65,
  Z: 90
}

function createCol(col) {
  return `
    <div class="column">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createCell() {
  return `
    <div class="cell" contenteditable></div>
  `
}

function createRow(content, number) {
  const resize = number ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row">
      <div class="row-info">
         ${number ? number : ''}
         ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(createCol)
    .join('')
  
  const cells = new Array(colsCount)
    .fill(createCell())
    .join('')
  
  rows.push(createRow(cols))
  
  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i+1))
  }
  
  return rows.join('')
}
