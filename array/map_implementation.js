const cart = [
  '{ "name": "Eraser", "price": 3.45 }',
  '{ "name": "Notebook", "price": 13.90 }',
  '{ "name": "Pencils", "price": 41.22 }',
  '{ "name": "Pen", "price": 7.50 }'
]

Array.prototype.myMap = function(callbackfn) {
  const resulting_array = []

  for (let index = 0; index < this.length; index++) {
    resulting_array.push(callbackfn(this[index], index, this))
  }
  return resulting_array
}

const prices = cart.myMap(product => {
  return JSON.parse(product).price
})

console.log(prices)