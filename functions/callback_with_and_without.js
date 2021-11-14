const grade = [7.7, 6.5, 5.2, 8.9, 3.6, 7.1, 9.0]

const reproved_without_callback = []

for (let i in grade) {
  if (grade[i] < 7) {
    reproved_without_callback.push(grade[i])
  }
}

console.log(
  "reproved_without_callback:",
  reproved_without_callback
)



const reproved_with_callback = grade.filter(function(grade) {
  return grade < 7
})

console.log(
  "reproved_with_callback:",
  reproved_with_callback
)



const reproved_with_arrow_callback = grade.filter(grade => grade < 7)

console.log(
  "reproved_with_arrow_callback:",
  reproved_with_arrow_callback
)