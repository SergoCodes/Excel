const CODES = {
  A: 65,
  Z: 90
}

function createCol(col) {
  return `
    <div class="column" data-type="resizable" data-letter="${col}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createCell(row){
  return function (letter, colNum) {
      return `
        <div class="cell"
          data-type="cell"
          data-letter="${letter}"
          data-id="${colNum}:${row}"
          contenteditable>
        </div>
      `
  }
}

function createRow(content, number) {
  const resize = number ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable">
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
  
  rows.push(createRow(cols))
  
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(createCell(row))
      .join('')
    
    rows.push(createRow(cells, row+1))
  }
  
  return rows.join('')
}
