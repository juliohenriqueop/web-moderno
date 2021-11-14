const fs = require('fs')
const path = require('path')

const save_path = path.normalize(__dirname + '/product.json')

const product = {
  name: 'TV',
  price: 2499.90,
  discount: 15
}

fs.writeFile(save_path, JSON.stringify(product), error => {
  let message = ''

  if (error) {
    message = `Error: could not write ${save_path}.`
  } else {
    message = `Product saved on ${save_path}.`
  }

  console.log(message)
})