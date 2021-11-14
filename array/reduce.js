const student = {
  name: 'Michael',
  age: 18,
  grades: [7.1, 8.5, 8.2, 8.7, 9.0, 9.2],

  getAverageGrade() {
    let result = this.grades.reduce((value, grade) => {
      return value += grade
    })
    return Math.ceil(result /= this.grades.length)
  }
}

console.log(student.getAverageGrade())