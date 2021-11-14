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

Array.prototype.myReduce = function(callbackfn, initial_value) {
  let previous_value = initial_value

  if (previous_value === undefined) {
    previous_value = this[0]
  }

  for (let index = 0; index < this.length; index++) {
    previous_value = callbackfn(previous_value, this[index], index, this)
  }

  return previous_value
}

function haveAllScholarship() {
  return students.map((student) => student.scholarship)
    .myReduce((last, current) => last && current)
}

function haveOneScholarship() {
  return students.map((student) => student.scholarship)
    .myReduce((last, current) => last || current)
}

console.log(haveAllScholarship())

console.log(haveOneScholarship())