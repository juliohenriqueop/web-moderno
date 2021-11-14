function randBetween({
  min = 0,
  max = 1000
}) {
  const value = Math.random() * (max - min) + min
  return Math.floor(value)
}

const randomizationRange = {
  min: 150,
  max: 250
}
console.log(randBetween(randomizationRange))

console.log(randBetween({}))






function randBetweenWithDefaultObject({
  min = 0,
  max = 1000
} = {}) {
  return randBetween({
    min,
    max
  })
}

console.log(randBetweenWithDefaultObject())