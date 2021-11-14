const person = {
  name: 'Rebeca',
  age: 2,
  weight: 13
}

console.log(Object.keys(person))

console.log(Object.values(person))

console.log(Object.entries(person))


Object.entries(person).forEach(([key, value]) => {
  console.log(`Key: ${key}, Value: ${value}`)
})

Object.defineProperty(person, 'date_of_birth', {
  enumerable: true,

  writable: false,

  value: '01/01/2019'
})

console.log(person.date_of_birth)

person.date_of_birth = '00/00/0000'

console.log(person.date_of_birth)



const obj1 = {
  a: 1
}
const obj2 = {
  b: 2
}
const obj3 = {
  c: 3,
  a: 500
}

const obj4 = Object.assign(obj1, obj2, obj3)

console.log(obj4)


Object.freeze(obj4)
obj4.new_property = 'will never be added'

console.log(obj4)