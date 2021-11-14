const printSum = function(a, b) {
  console.log(a + b)
}

printSum(2, 2)

console.log(typeof printSum)


const sum = (a, b) => {
  return a + b
}

console.log(sum(10, 10))


const subtraction = (a, b) => a - b

console.log(subtraction(5, 5))


const printName = name => console.log(name)

printName('Fulano')