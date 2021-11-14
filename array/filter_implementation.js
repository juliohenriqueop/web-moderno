const products = [{
    name: 'Laptop',
    price: 2499,
    fragile: true
  },
  {
    name: 'iPad Pro',
    price: 4199,
    fragile: true
  },
  {
    name: 'Glass',
    price: 12.50,
    fragile: true
  },
  {
    name: 'Plastic Cup',
    price: 18.99,
    fragile: false
  },
]

Array.prototype.myFilter = function(callbackfn) {
  const resulting_array = []

  for (let index = 0; index < this.length; index++) {
    const element = this[index]

    if (callbackfn(element, index, this)) {
      resulting_array.push(element)
    }
  }
  return resulting_array
}

const isExpensive = product => product.price >= 500
const isFragile = product => product.fragile

console.log(products.myFilter((product) => {
  return isExpensive(product) && isFragile(product)
}))