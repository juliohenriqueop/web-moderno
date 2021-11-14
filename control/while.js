function getRandomIntegerBetween(min, max) {
  const value = Math.random() * (max - min) + min
  return Math.floor(value)
}

let n = 0

while (n !== -1) {
  n = getRandomIntegerBetween(-1, 10)
  console.log('Random value:', n)
}

console.log('done!')