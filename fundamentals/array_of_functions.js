const var_functions = []

for (var a = 0; a < 10; a++) {
  var_functions.push(function() {
    console.log(a)
  })
}

var_functions[2]()

var_functions[8]()


const let_functions = []

for (let b = 0; b < 10; b++) {
  let_functions.push(function() {
    console.log(b)
  })
}

let_functions[2]()

let_functions[8]()