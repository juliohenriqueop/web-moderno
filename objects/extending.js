console.log(typeof String)

console.log(typeof Array)

console.log(typeof Object)



String.prototype.reverse = function() {
  return this.split('').reverse().join('')
}

console.log('aeiou'.reverse())



Array.prototype.last = function() {
  return this[this.length - 1]
}

console.log([1, 2, 3, 4, 5].last())

console.log(['a', 'e', 'i', 'o', 'u'].last())



String.prototype.toString = function() {
  return 'Game Over'
}

console.log('aeiou'.reverse())