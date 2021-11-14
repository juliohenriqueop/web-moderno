const ferrari = {
  model: 'F40',
  max_speed: 340
}

const volvo = {
  model: 'V40',
  max_speed: 200
}

console.log(ferrari.prototype)

console.log(ferrari.__proto__)

console.log(ferrari.__proto__ === Object.prototype)



console.log(volvo.__proto__)

console.log(volvo.__proto__ == Object.prototype)



console.log(Object.prototype.__proto__ === null)



function myObj(params) {}

console.log(typeof Object, typeof myObj)

console.log(Object.prototype, myObj.prototype)