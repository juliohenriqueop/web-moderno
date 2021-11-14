console.log(typeof Array)

console.log(typeof new Array)

console.log(typeof [])



let approved_ones = new Array('Bia', 'Carlos', 'Ana')
console.log(approved_ones)



approved_ones = ['Bia', 'Carlos', 'Ana']

console.log(approved_ones[0])

console.log(approved_ones[1])

console.log(approved_ones[2])

console.log(approved_ones[3])



approved_ones[3] = 'Paulo'

console.log(approved_ones[3])

approved_ones.push('Abia')

console.log(approved_ones.length)

console.log(approved_ones[4])



approved_ones[9] = 'Rafael'
console.log(approved_ones)



approved_ones.sort()
console.log(approved_ones)



delete approved_ones[1]

console.log(approved_ones[1])



approved_ones = ['Bia', 'Carlos', 'Ana']

approved_ones.splice(1, 2, 'Michael')

console.log(approved_ones)