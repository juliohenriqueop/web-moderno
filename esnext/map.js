const techs = new Map()
techs.set('react', {
  framework: false
})
techs.set('angular', {
  framework: true
})


console.log(techs.get('react'))

console.log(techs.get('angular').framework)



const key_values = new Map([
  [function() {}, 'Function'],
  [{}, 'Object'],
  [123, 'Number']
])

console.log(key_values)
console.log('Size:', key_values.size)

console.log(key_values.has(123))

console.log(key_values.delete(123))

console.log(key_values.get(123))



key_values.set(123, '123 Number')
key_values.set('123', '123 String')

console.log(key_values.get(123))

console.log(key_values.get('123'))



key_values.set(123, 'Hello World !')

console.log(key_values.get(123))


key_values.forEach((value, key) => {
  console.log('Key:', key, '-', 'Value:', value)
})