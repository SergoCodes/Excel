import {$} from '@core/dom'

export function resizeHandler($root, event){
  return new Promise(resolve => {
    event.preventDefault()
    const $resizer = $(event.target)
    const $parent = $resizer.closest(`[data-type="resizable"]`)
    const coords = $parent.getCoords()
    const type = event.target.dataset.resize
    const cells = selectCellsByColId($parent.data.col)
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
      
      value = Math.floor(value)
    
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
      
      resolve({
        value,
        type,
        id: $parent.data[type]
      })
    }
  })
}

function selectCellsByColId(col) {
  return document.querySelectorAll(`[data-col="${col}"]`)
}
