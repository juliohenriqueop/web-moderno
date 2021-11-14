const promise = new Promise((resolve, reject) => {
  resolve(['Ana', 'Bia', 'Carlos', 'Daniel'])
})

const getFirstElement = array => array[0]
const getFirstLetter = string => string[0]
const getLowerCase = letter => letter.toLowerCase()

promise
  .then(value => getFirstElement(value))

  .then(name => getFirstLetter(name))

  .then(letter => console.log(getLowerCase(letter)))