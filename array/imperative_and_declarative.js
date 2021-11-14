const students = [{
    name: 'João',
    grade: 7.9
  },
  {
    name: 'Maria',
    grade: 9.2
  }
]

let average = 0
for (let index = 0; index < students.length; index++) {
  average += students[index].grade
}
average /= students.length

console.log(average)



const getGrade = student => student.grade
const getSum = (grade, current) => grade + current
const getAverage = (grade, n) => grade / n

average = students.map(getGrade).reduce(getSum)
average = getAverage(average, students.length)

console.log(average)