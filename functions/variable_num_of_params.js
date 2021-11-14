function sum() {
  let value = 0

  for (let i in arguments) {
    value += arguments[i]
  }

  return value
}

console.log(sum())
console.log(sum(1))
console.log(sum(1.1, 2.2, 3.3))
console.log(sum(1, 2, ' ', 'Hello'))
console.log(sum('a', 'b', 'c'))