import createElement from './createElement.js'

export default function Score() {
  const element = createElement('div', 'score')

  this.getElement = () => {
    return element
  }

  this.set = (value) => {
    element.innerText = `${value}`
  }

  this.get = () => {
    return parseInt(element.innerText)
  }

  this.increment = () => {
    let scoreValue = this.get()
    scoreValue += 1

    this.set(scoreValue)
  }

  this.reset = () => {
    this.set(0)
  }

  this.reset()
}