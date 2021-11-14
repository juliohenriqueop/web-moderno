import createElement from './createElement.js'

export default function Bird() {
  const element = createElement('img', 'bird')
  element.src = "./imgs/passaro.png"
  element.alt = "passaro"

  this.getElement = () => {
    return element
  }

  this.getWidth = () => {
    return element.clientWidth
  }

  this.getHeight = () => {
    return element.clientHeight
  }

  this.setVerticalPosition = (verticalPosition) => {
    element.style.bottom = `${verticalPosition}px`
  }

  this.getVerticalPosition = () => {
    const verticalPositionString = element.style.bottom.split('px')[0]
    const verticalPosition = parseInt(verticalPositionString)

    return verticalPosition
  }

  this.setRelativeVerticalPosition = (relativeVerticalPosition) => {
    let currentVerticalPosition = this.getVerticalPosition()
    const newVerticalPosition = currentVerticalPosition + relativeVerticalPosition

    this.setVerticalPosition(newVerticalPosition)
  }

  this.fly = () => {
    this.setRelativeVerticalPosition(5)
  }

  this.fall = () => {
    this.setRelativeVerticalPosition(-5)
  }
}