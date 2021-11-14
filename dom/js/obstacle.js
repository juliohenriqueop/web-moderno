import createElement from './createElement.js'
import Tube, {
  tubeDirection
} from './tube.js'

export default function Obstacle() {
  const topTube = new Tube(tubeDirection.top)
  const bottomTube = new Tube(tubeDirection.down)

  const element = createElement('div', 'obstacle')
  element.appendChild(topTube.getElement())
  element.appendChild(bottomTube.getElement())

  this.getElement = () => {
    return element
  }

  this.getTopTube = () => {
    return topTube
  }

  this.getBottomTube = () => {
    return bottomTube
  }

  this.randomHeight = () => {
    const height = 579
    const gap = 130

    const topTubeHeight = Math.random() * (height - gap)
    const bottomTubeHeight = height - gap - topTubeHeight

    topTube.setHeight(topTubeHeight)
    bottomTube.setHeight(bottomTubeHeight)
  }

  this.setPosition = (position) => {
    element.style.right = `${position}px`
  }

  this.getPosition = () => {
    const positionString = element.style.right.split('px')[0]
    const position = parseInt(positionString)

    return position
  }

  this.setPosition(-150)
  this.randomHeight()
}