const manufacturer = [
  'Mercedes', 'Audi', 'BMW'
]

function callback(value, index) {
  console.log(`${index + 1} - ${value}.`)
}

manufacturer.forEach(callback)