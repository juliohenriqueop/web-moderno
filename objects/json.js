const obj = {
  a: 1,
  b: 2,
  c: 3,

  sum: () => a + b + c
}

console.log(JSON.stringify(obj))



console.log(JSON.parse('{ "name": "Ana", "age": 29 }'))