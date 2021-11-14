class Person {
  constructor(name) {
    this.name = name
  }

  sayHello() {
    return `Hello ${this.name}, be welcome !`
  }
}

const persons = [
  new Person('George'),
  new Person('Paul')
]

console.log(persons[0].sayHello())

console.log(persons[1].sayHello())



const createPerson = (name) => {
  return {
    sayHello() {
      return `Hello ${name}, be welcome !`
    }
  }
}

persons.push(createPerson('Michael'))
persons.push(createPerson('Antony'))

console.log(persons[2].sayHello())

console.log(persons[3].sayHello())