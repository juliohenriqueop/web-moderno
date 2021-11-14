Number.prototype.between = function(begin, end) {
  return this >= begin && this <= end
}

function isApproved(grade) {
  if (grade.between(9, 10))
    console.log('Approved as TOP student, grade:', grade)
  else if (grade.between(7, 8))
    console.log('Approved, grade:', grade)
  else if (grade.between(4, 6))
    console.log('Not approved, should retry, grade:', grade)
  else if (grade.between(0, 3))
    console.log('Reproved, grade:', grade)
  else
    console.log('Invalid grade.')
}

isApproved(9)
isApproved(7.1)
isApproved(5)
isApproved(2.8)
isApproved(-1)
isApproved(11)