const parent = {
  name: 'Pedro',
  hair_color: 'black'
}

const child1 = Object.create(parent)
child1.name = 'Ana'

console.log(child1)


const child2 = Object.create(parent, {
  name: {
    value: 'Bia',
    writable: false,
    enumerable: true
  }
})

child2.name = 'Carla'

console.log(child2)



console.log(Object.keys(child1))
console.log(Object.keys(child2))



for (key in child2) {
  if (child2.hasOwnProperty(key))
    console.log(`child1.${key} = ${child2[key]}`)
  else {
    console.log(`child1.__proto__.${key} = ${child2.__proto__[key]}`)
  }
}