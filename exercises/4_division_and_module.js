function divide(x, y) {
  return {
    result: Math.trunc(x / y),
    remainder: x % y
  }
}


const division = divide(5, 3)

console.log('Result:', division.result)

console.log('Remainder:', division.remainder)