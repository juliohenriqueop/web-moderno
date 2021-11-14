const cart = [
  '{ "name": "Eraser", "price": 3.45 }',
  '{ "name": "Notebook", "price": 13.90 }',
  '{ "name": "Pencils", "price": 41.22 }',
  '{ "name": "Pen", "price": 7.50 }'
]

const prices = cart.map((product) => {
  return JSON.parse(product).price
})

console.log(prices)