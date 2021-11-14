let double = function(value) {
  return value * 2
}

double = (value) => {
  return value * 2
}

double = value => value * 2

console.log(double(Math.PI).toFixed(2))


let hello = () => 'hello'
hello = _ => 'hello'

console.log(hello())