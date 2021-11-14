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

async function getAllStudents() {

  const students_from_class_a = await getStudents('A')
  const students_from_class_b = await getStudents('B')
  const students_from_class_c = await getStudents('C')

  const all_students = [
    ...students_from_class_a,
    ...students_from_class_b,
    ...students_from_class_c
  ]

  return all_students
}

getAllStudents()
  .then(students => students.map(student => student.nome))
  .then(names => console.log(names))