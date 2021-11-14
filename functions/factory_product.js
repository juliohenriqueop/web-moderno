function createProduct(name, price, discount_percentage = 0) {
  return {
    name,
    price: price - (price * discount_percentage / 100).toFixed(2)
  }
}

const toaster = createProduct('Toaster', 49.90)
console.log('Toaster:', toaster)

const smartphone = createProduct('iPhone X', 4999.90, 10)
console.log('Smartphone:', smartphone)

const tv = createProduct('Smart TV 4k 50inch', 8999.90, 25)
console.log('TV:', tv)