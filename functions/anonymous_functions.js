const sum = function(x, y) {
  return x + y
}

const getResult = function(x, y, operation) {
  return operation(x, y)
}

console.log(getResult(3, 4, sum))

console.log(getResult(3, 4, function(x, y) {
  return x - y;
}))

console.log(getResult(3, 4, (x, y) => x * y))


const person = {
  sayHello: function() {
    console.log('Hello !')
  }
}

person.sayHello()