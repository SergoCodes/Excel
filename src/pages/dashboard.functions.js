import {storage} from '@core/utils'

function toHTML(key) {
  const model = storage(key)
  
  return `
    <li class="db__record">
      <a href="#${key}">${model.title}</a>
      <strong>
        ${new Date(model.openedDate).toLocaleDateString()}
        ${new Date(model.openedDate).toLocaleTimeString()}
        </strong>
    </li>
  `
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i <localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  
  return keys
}

export function createDashboardList() {
  const keys = getAllKeys()
  
  if (!keys.length) return `<h2 style="text-align: center">No tables</h2>`
  
  return `
  <div class="db__table db__view">

    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>
  
    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>
  
  </div>
  `
}
