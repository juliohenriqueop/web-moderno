console.log(this === global)

console.log(this === exports)

console.log(this === module.exports)

console.log(exports === module.exports)


function whoIsThisInsideAFunction() {
  console.log(this === global)
}
whoIsThisInsideAFunction()


const whoIsThisInsideAnArrowFunction = () => {
  return console.log(this === exports)
}
whoIsThisInsideAnArrowFunction()