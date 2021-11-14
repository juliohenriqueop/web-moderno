const message = 'Hi!'

function sayHello() {
  const message = 'Hello!'

  return message
}

const client = {

  name: 'Paul',

  age: 32,

  purchase: {

    product: {

      name: 'Wine',

      age: 16
    },

    delivery_address: 'Far Far Away'
  }
}

console.log(message)

console.log(sayHello())

console.log(client)