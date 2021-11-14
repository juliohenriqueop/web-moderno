const grades = [6.7, 7.4, 9.8, 8.1, 7.7]

for (let index in grades) {
  console.log(`grades[${index}]:`, grades[index])
}

const person = {
  name: 'Ana',
  surname: 'Silva',
  age: 29,
  weight: 64
}

for (var element in person) {
  console.log(`person[${element}]:`, person[element])
}

console.log(typeof element)