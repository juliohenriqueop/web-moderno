const isApproved = function(grade) {
  if (grade >= 7) {
    console.log('Approved, grade:', grade)
  } else {
    console.log('Reproved, grade:', grade)
  }
}

isApproved(10)
isApproved(4)

isApproved('???')