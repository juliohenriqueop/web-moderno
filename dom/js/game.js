import Obstacle from './obstacle.js'
import Bird from './bird.js'
import Score from './score.js'
import isColliding from './collision.js'

export default function Game() {
  const element = document.querySelector('[wm-flappy]')

  const bird = new Bird()
  const score = new Score()

  let isBirdFalling = true

  const obstacles = [
    new Obstacle(),
    new Obstacle(),
    new Obstacle(),
    new Obstacle()
  ]

  const spawnObstacles = () => {
    obstacles.forEach((obstacle, index) => {
      element.appendChild(obstacle.getElement())

      const begin = -150
      const difference = index * 340

      const position = begin - difference

      obstacle.setPosition(position)
    })
  }

  const spawnBird = () => {
    const birdVerticalPosition = this.getHeight() / 2
    bird.setVerticalPosition(birdVerticalPosition)

    element.appendChild(bird.getElement())
  }

  const spawnScore = () => {
    score.reset()
    element.appendChild(score.getElement())
  }

  const bindKeyboard = () => {
    window.onkeypress = (event) => {
      const key = event.code
      if (key === 'Space') {
        isBirdFalling = false
      }
    }

    window.onkeyup = (event) => {
      const key = event.code
      if (key === 'Space') {
        isBirdFalling = true
      }
    }
  }

  this.getElement = () => {
    return element
  }

  this.getWidth = () => {
    return element.clientWidth
  }

  this.getHeight = () => {
    return element.clientHeight
  }

  this.load = () => {
    spawnObstacles()
    spawnBird()
    spawnScore()

    bindKeyboard()
  }

  this.update = () => {
    if (isBirdFalling) {
      const minimumVerticalPosition = 0

      if (bird.getVerticalPosition() > minimumVerticalPosition) {
        bird.fall()
      } else {
        this.load()
      }
    } else {
      const birdHeight = bird.getHeight()
      const gameAreaHeight = this.getHeight()

      const maximumVerticalPosition = gameAreaHeight - birdHeight

      if (bird.getVerticalPosition() < maximumVerticalPosition) {
        bird.fly()
      } else {
        this.load()
      }
    }

    obstacles.forEach(obstacle => {
      const begin = -150
      const end = this.getWidth()
      const center = end / 2

      let position = obstacle.getPosition()

      if (position === center) {
        score.increment()
      }

      if (position > end) {
        obstacle.setPosition(begin)
        obstacle.randomHeight()
      } else {
        obstacle.setPosition(++position)
      }

      const topTube = obstacle.getTopTube()
      const bottomTube = obstacle.getBottomTube()

      const collidedWithTop = isColliding(bird.getElement(), topTube.getElement())
      const collidedWithBottom = isColliding(bird.getElement(), bottomTube.getElement())

      const collided = collidedWithTop || collidedWithBottom

      if (collided) {
        this.load()
      }
    })
  }
}