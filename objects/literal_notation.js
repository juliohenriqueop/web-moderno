const a = 1,
  b = 2,
  c = 3

const obj1 = {
  a: a,
  b: b,
  c: c
}

console.log(obj1)


const obj2 = {
  a,
  b,
  c
}

console.log(obj2)



const attribute_name = 'grade'
const attribute_value = 7.87

const obj3 = {}

obj3[attribute_name] = attribute_value

console.log(obj3[attribute_name])
console.log(obj3.grade)



const obj4 = {
  [attribute_name]: attribute_value
}

console.log(obj4)



const obj5 = {
  doSomething1: function(params) {
    return 'Something 1'
  },
  doSomething2(params) {
    return 'Something 2'
  }
}

console.log(obj5)