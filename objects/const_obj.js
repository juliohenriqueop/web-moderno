const person = {
  name: 'João'
}

person.name = 'Pedro'

console.log(person.name)



Object.freeze(person)

person.name = 'Ana'

console.log(person.name)

delete person.name

console.log(person.name)

person.age = 20

console.log(person.age)


const constant_person = Object.freeze({
  name: 'Maria'
})

console.log(constant_person)