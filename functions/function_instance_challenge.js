function Person(name) {

  this.name = name

  this.sayHello = function() {
    return `Hello ${this.name}, be welcome !`
  }
}

const persons = [
  new Person('Andre'),
  new Person('Steve')
]

console.log(persons[0].sayHello())

console.log(persons[1].sayHello())