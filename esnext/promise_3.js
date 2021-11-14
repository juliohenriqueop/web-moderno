function generateNumberBetween(min, max) {
  if (min > max)[min, max] = [max, min]

  return new Promise(resolve => {
    const result = Math.random() * (max - min + 1) + min
    const rounded = Math.floor(result)

    resolve(rounded)
  })
}

generateNumberBetween(1, 60)
  .then(number => number * 10)
  .then(numberX10 => `Resultado multiplicado por 10: ${numberX10}.`)
  .then(console.log)