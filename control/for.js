let n = 0
while (n <= 10) {
  console.log('While:', n)
  n++
}

for (let i = 0; i <= 10; i++) {
  console.log('For:', i)
}

const grades = [6.7, 7.4, 9.8, 8.1, 7.7]

for (let i = 0; i < grades.length; i++) {
  console.log(`grades[${i}]:`, grades[i])
}