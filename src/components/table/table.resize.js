import {$} from '@core/dom'

export function resizeHandler($root, event){
  event.preventDefault()
  const $resizer = $(event.target)
  const $parent = $resizer.closest(`[data-type="resizable"]`)
  const coords = $parent.getCoords()
  const type = event.target.dataset.resize
  const cells = selectCellsByLetter($parent.data.letter)
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value
  
  document.onmousemove = e => {
    if (type === 'row'){
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({bottom: `${-delta}px`})
    } else {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({right: `${-delta}px`})
    }
    
    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px',
    })
  }
  
  document.onmouseup = () => {
    $resizer.css({
      opacity: 0,
      [sideProp]: '0px',
    })
    
    if (type === 'row'){
      $resizer.css({bottom: `0px`})
      $parent.css({height: `${value}px`})
    } else {
      $resizer.css({right: `0px`})
      cells.forEach(el => el.style.width = value + 'px')
    }
    document.onmouseup = null
    document.onmousemove = null
  }
}

function selectCellsByLetter(letter) {
  return document.querySelectorAll(`[data-letter="${letter}"]`)
}

