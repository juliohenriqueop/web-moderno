const students = [{
    name: 'João',
    grade: 7.3,
    scholarship: true
  },
  {
    name: 'Maria',
    grade: 9.2,
    scholarship: false
  },
  {
    name: 'Pedro',
    grade: 9.8,
    scholarship: true
  },
  {
    name: 'Ana',
    grade: 8.7,
    scholarship: true
  }
]

function haveAllScholarship() {
  return students.map((student) => student.scholarship)
    .reduce((last, current) => last && current)
}

function haveOneScholarship() {
  return students.map((student) => student.scholarship)
    .reduce((last, current) => last || current)
}

console.log(haveAllScholarship())

console.log(haveOneScholarship())