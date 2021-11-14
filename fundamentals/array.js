const array = [7.7, 8.9, 6.3, 9.2]

console.log(array[0], array[3])

console.log(array[1000])

array[4] = 10
console.log(array)


console.log(array.length)

array[10] = 'Hello'
console.log(array)

array.push({
  id: 3
}, false, null, 'Test')
console.log(array)

array.pop()
console.log(array)

delete array[2]
console.log(array)

console.log(typeof array)