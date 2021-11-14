function generateNumberBetween(min, max, delay) {
  if (min > max)[min, max] = [max, min]

  return new Promise(resolve => {
    setTimeout(() => {
      const result = Math.random() * (max - min + 1) + min
      const rounded = Math.floor(result)

      resolve(rounded)
    }, delay)
  })
}

function generateNumbers() {
  return Promise.all([
    generateNumberBetween(1, 60, 4000),
    generateNumberBetween(1, 60, 1000),
    generateNumberBetween(1, 60, 500),
    generateNumberBetween(1, 60, 3000),
    generateNumberBetween(1, 60, 1500)
  ])
}

console.time('benchmark')
generateNumbers()
  .then(console.log)
  .then(() => console.timeEnd('benchmark'))