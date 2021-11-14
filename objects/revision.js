const product = new Object

product.name = 'Iphone X'
product['brand'] = 'Apple'
product.price = 3999.90

console.log(product)

delete product.name
delete product['brand']

console.log(product)

const car = {
  model: 'A4',
  price: 89000,
  owner: {
    name: 'Raul',
    age: 56,
    address: {
      street: 'Anywhere',
      number: 123
    }
  },
  drivers: [{
      name: 'Junior',
      age: 19
    },
    {
      name: 'Ana',
      age: 42
    }
  ],
  getInsurancePrice: () => Math.ceil((car.price / 100) * 5)
}

console.log(car)

car.owner.address.street = 'Far Far Away'
console.log(car)

console.log(car['string property name from elsewhere'])

delete car.drivers
delete car.owner.address
delete car.getInsurancePrice

console.log(car)

console.log(car.drivers)