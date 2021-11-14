const product = Object.preventExtensions({
  name: 'Any',
  price: 0,
  tag: 'none'
})

console.log('Extensible:', Object.isExtensible(product))

product.name = 'Eraser'
product.price = 1.99
delete product.tag

product.description = 'White eraser'

console.log(product)



const person = {
  name: 'Juliana',
  age: 35
}

Object.seal(person)

console.log('Sealed:', Object.isSealed(person))

person.surname = 'Silva'
delete person.name

person.age = 29

console.log(person)