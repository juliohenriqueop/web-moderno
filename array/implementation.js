const AlmostAnArray = {
  0: 'Rafael',
  1: 'Ana',
  2: 'Bia'
}

Object.defineProperty(AlmostAnArray, 'toString', {
  value: function() {
    return Object.values(this)
  },
  enumerable: false
})

console.log(AlmostAnArray)

const arr = ['Rafael', 'Ana', 'Bia']
console.log(arr)


console.log(AlmostAnArray.toString())