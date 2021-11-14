const module_a = require('../../module_a')

const folder_import = require('./deep')

console.log(module_a.hello)

console.log(folder_import.hello_world)


const http = require('http')

http.createServer((req, res) => {
  res.write(folder_import.hello_world)
  res.end()
}).listen(8080)