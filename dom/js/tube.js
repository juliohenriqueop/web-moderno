import createElement from './createElement.js'

export const tubeDirection = {
  top: false,
  down: true
}

export default function Tube(direction = tubeDirection.down) {
  const tubeHead = createElement('div', 'head')
  const tubeBody = createElement('div', 'body')

  const element = createElement('div', 'tube')

  if (direction === tubeDirection.down) {
    element.appendChild(tubeHead)
    element.appendChild(tubeBody)
  } else {
    element.appendChild(tubeBody)
    element.appendChild(tubeHead)
  }

  this.getElement = () => {
    return element
  }

  this.setHeight = height => {
    tubeBody.style.height = `${height}px`
  }
}