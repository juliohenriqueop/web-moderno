console.log(this === module.exports)

let a = 100
console.log(a)

console.log(this.a)

global.b = 555

console.log(b)

this.c = 999


console.log(module.exports.c)

d = 1
console.log(global.d)

console.log(module.exports)