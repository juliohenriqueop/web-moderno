import Game from './game.js'

window.addEventListener('load', () => {
  const game = new Game()
  game.load()

  setInterval(() => game.update(), 16)
})