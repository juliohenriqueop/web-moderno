console.log(Math.ceil(6.1))


const sport = {}
sport.name = 'soccer'
console.log(sport.name)


function Person(name) {


  this.name = name

  this.sayHello = function() {
    console.log(`Hello ${this.name}, be welcome !`)
  }

}


const user = new Person('Adam')

const admin = new Person('Paul')


user.sayHello()

admin.sayHello()