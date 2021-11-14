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

const isExpensive = product => product.price >= 500
const isFragile = product => product.fragile

console.log(products.filter((product) => {
  return isExpensive(product) && isFragile(product)
}))