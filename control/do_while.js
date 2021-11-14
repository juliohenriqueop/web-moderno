function getRandomIntegerBetween(min, max) {
  const value = Math.random() * (max - min) + min
  return Math.floor(value)
}

let n = -1

do {
  n = getRandomIntegerBetween(-1, 10)
  console.log(n)
}
while (n !== -1)

console.log('done!')