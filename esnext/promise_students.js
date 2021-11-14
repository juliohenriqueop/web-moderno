const http = require('http')

function getStudents(from_class) {
  const url = `http://files.cod3r.com.br/curso-js/turma${from_class}.json`

  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let students = ''

      res.on('data', buffer => {
        students += buffer
      })

      res.on('end', () => {
        try {
          resolve(JSON.parse(students))
        } catch (error) {
          reject(error)
        }
      })
    })
  })
}

Promise.all([getStudents('A'), getStudents('B'), getStudents('C')])
  .then(students => [].concat(...students))
  .then(students => students.map(student => student.nome))
  .then(names => console.log(names))
  .catch(error => console.log('Error:', error.message))