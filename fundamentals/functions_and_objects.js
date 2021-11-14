console.log(typeof Object)
console.log(typeof new Object)


const Client = function() {}
console.log(typeof Client)
console.log(typeof new Client)


class Product {}
console.log(typeof Product)
console.log(typeof new Product)


const purchase = {
  client: new Client(),
  product: new Product()
}

console.log(typeof purchase)