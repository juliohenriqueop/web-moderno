function randBetween([min = 0, max = 100]) {
  if (min > max)[min, max] = [max, min]

  const value = Math.random() * (max - min) + min
  return Math.floor(value)
}

console.log(randBetween([50, 40]))

console.log(randBetween([92]))

console.log(randBetween([, 10]))

console.log(randBetween([]))






function randBetweenWithDefaultArray([min = 0, max = 100] = []) {
  return randBetween([min, max])
}

console.log(randBetweenWithDefaultArray())