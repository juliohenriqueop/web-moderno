function func1() {

}

const func2 = function() {

}

const array = [
  function(a, b) {
    return a + b
  },
  func1,
  func2
]

console.log(array[0](2, 2))

const obj = {
  sayHello: function() {
    console.log('Hello')
  }
}

obj.sayHello()

function execute(func) {
  if (typeof func === 'function')
    func()
}

execute(function() {
  console.log('Function1 executed from parameter')
})
execute(function() {
  console.log('Function2 executed from parameter')
})



function sum(a, b) {
  const first_result = a + b

  return function(c) {
    console.log(first_result + c)
  }
}

sum(1, 1)(1)