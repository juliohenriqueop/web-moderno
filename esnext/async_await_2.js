function generateNumberBetween(min, max, bannedNumbers) {
  if (min > max)[min, max] = [max, min]

  return new Promise((resolve, reject) => {
    const result = Math.random() * (max - min + 1) + min
    const rounded = Math.floor(result)

    if (bannedNumbers.includes(rounded))
      reject('The generated number is repeated.')
    else
      resolve(rounded)
  })
}

async function generateLuckyNumbers(amount) {
  try {
    const numbers = []
    for (let number of Array(amount).keys()) {
      numbers.push(await generateNumberBetween(1, 60, numbers))
    }

    return numbers
  } catch (error) {
    throw error
  }
}

generateLuckyNumbers(8)
  .then(console.log)
  .catch(console.log)