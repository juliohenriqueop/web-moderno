function MyObject() {}

console.log(MyObject.prototype)

console.log(MyObject.prototype.__proto__ === Object.prototype)

console.log((new MyObject).__proto__ === MyObject.prototype)



const obj1 = new MyObject
const obj2 = new MyObject

console.log(obj1.__proto__ === obj2.__proto__)

console.log(obj1.__proto__ === MyObject.prototype)

console.log(obj2.__proto__ === MyObject.prototype)



MyObject.prototype.name = 'Unknown'

MyObject.prototype.sayHello = function() {
  console.log(`Hello ${this.name}, be welcome !`)
}


obj1.sayHello()

obj2.name = 'Rafael'
obj2.sayHello()



const obj3 = {}
obj3.__proto__ = MyObject.prototype

obj3.name = 'Michael'
obj3.sayHello()



console.log(MyObject.__proto__ === Function.prototype)

console.log(Function.prototype.__proto__ === Object.prototype)

console.log(Object.prototype.__proto__ === null)