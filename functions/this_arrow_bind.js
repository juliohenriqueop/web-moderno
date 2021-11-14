const thisInsideThisModule = this

console.log(
  '(thisInsideThisModule === global):',
  thisInsideThisModule === global
)

console.log(
  '(thisInsideThisModule === module.exports):',
  thisInsideThisModule === module.exports
)

let thisInsideAFunction = function() {
  return this
}

console.log(
  '(thisInsideAFunction() === global):',
  thisInsideAFunction() === global
)

const obj = {}

thisInsideAFunction = thisInsideAFunction.bind(obj)
console.log('thisInsideAFunction = thisInsideAFunction.bind(obj)')

console.log(
  '(thisInsideAFunction() === obj):',
  thisInsideAFunction() === obj
)

console.log(
  '(thisInsideAFunction() === global):',
  thisInsideAFunction() === global
)

let thisInsideAnArrowFunction = () => thisInsideThisModule

console.log(
  '(thisInsideAnArrowFunction() === global):',
  thisInsideAnArrowFunction() === global
)

console.log(
  '(thisInsideAnArrowFunction() === module.exports):',
  thisInsideAnArrowFunction() === module.exports
)

console.log(
  '(thisInsideAnArrowFunction() === thisInsideThisModule):',
  thisInsideAnArrowFunction() === thisInsideThisModule
)

thisInsideAnArrowFunction = thisInsideAnArrowFunction.bind(obj)
console.log('thisInsideAnArrowFunction = thisInsideAnArrowFunction.bind(obj)')

console.log(
  '(thisInsideAnArrowFunction() === obj):',
  thisInsideAnArrowFunction() === obj
)