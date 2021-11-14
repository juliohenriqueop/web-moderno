const object = {
  counter: 0
}

console.log(object)

const reference = object
reference.counter = 1000
console.log(reference)
console.log(object)


var x = 500
var y = x
y = 600
console.log(x)
console.log(y)


let value

console.log(value)




value = null
console.log(value)




const product = {}
console.log(product)
console.log(!!product)


console.log(product.price)
console.log(!!product.price)


product.price = 3.50
console.log(product.price)
console.log(!!product.price)


product.price = undefined
console.log(product.price)
console.log(!!product.price)


console.log(product)
console.log(!!product)


delete product.price
console.log(product)
console.log(!!product)


product.price = null
console.log(product)
console.log(!!product)