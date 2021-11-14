const fs = require('fs')
const path = require('path')

function readTextFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err)
        reject(err)
      else
        resolve(data)
    })
  })
}

const filePath = path.join(__dirname, 'dados.txt')

readTextFile(filePath)
  .then(text => text.split('\n'))
  .then(lines => lines.join(', '))
  .then(content => `Conteudo do arquivo: ${content}.`)
  .then(console.log)