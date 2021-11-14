const person = {
  name: 'Ana',
  age: 5,
  address: {
    street: 'Anywhere',
    number: 1000
  }
}

const {
  name,
  age
} = person
console.log(name, age)


const {
  name: her,
  age: born
} = person
console.log(her, born)


const {
  address: {
    number
  }
} = person
console.log(number)


const {
  address
} = person
console.log(address)


const {
  mother
} = person
console.log(mother)


const {
  address: {
    state,
    street
  }
} = person
console.log(state, street)