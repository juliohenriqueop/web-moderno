const school = [{
  name: 'Science Class',
  students: [{
    name: 'Gustavo',
    grade: 8.1
  }, {
    name: 'Ana',
    grade: 9.3
  }]
}, {
  name: 'Math Class',
  students: [{
    name: 'Rebeca',
    grade: 8.9
  }, {
    name: 'Roberto',
    grade: 7.3
  }]
}]

Array.prototype.flatMap = function(callbackfn) {
  return Array.prototype.concat.apply([], this.map(callbackfn))
}

const getStudentGrade = students => students.grade
const getClassGrade = school_class => school_class.students.map(getStudentGrade)

console.log(school.map(getClassGrade))

console.log(school.flatMap(getClassGrade))