let isActive = false

console.log(isActive)
console.log(typeof isActive)

isActive = true

console.log(isActive)
console.log(typeof isActive)


console.log(!isActive)


isActive = 1
console.log(isActive)
console.log(typeof isActive)


console.log(!!isActive)


console.log('Non boolean values that resolves to true...')
console.log(!!1)

console.log(!!-1)

console.log(!!"Hello World !")

console.log(!![])

console.log(!!{})

console.log(!!Infinity)

console.log(!!(isActive = true))



console.log('Non boolean values that resolves to false...')

console.log(!!0)

console.log(!!'')

console.log(!!null)

console.log(!!NaN)

console.log(!!undefined)

console.log(!!(isActive = false))

console.log(!!('' || null || 0 || 123))


console.log('' || null || 0 || 'Hello' || 123)


let name = ''
console.log(name || 'Unknown')