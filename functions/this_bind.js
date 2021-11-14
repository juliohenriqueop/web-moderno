const person = {
  message: 'Hello !',
  sayHello() {
    return console.log(this.message)
  }
}

person.sayHello()


const sayHello = person.sayHello
sayHello()


const sayHelloPerson = person.sayHello.bind(person)
sayHelloPerson()


sayHello()