const http = require('http')

function getStudents(from_class, callback) {
  const url = `http://files.cod3r.com.br/curso-js/turma${from_class}.json`

  http.get(url, res => {
    let students = ''

    res.on('data', buffer => {
      students += buffer
    })

    res.on('end', () => {
      callback(JSON.parse(students))
    })
  })
}

let names = []
getStudents('A', students_from_class_a => {
  names = names.concat(students_from_class_a.map(student => `Class A: ${student.nome}`))

  getStudents('B', students_from_class_b => {
    names = names.concat(students_from_class_b.map(student => `Class B: ${student.nome}`))

    getStudents('C', students_from_class_c => {
      names = names.concat(students_from_class_c.map(student => `Class C: ${student.nome}`))

      console.log(names)
    })
  })
})