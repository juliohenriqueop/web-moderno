function isApproved(grade) {
  return grade > 7 ? 'Approved !' : 'Reproved !'
}

console.log(isApproved(7.1))

console.log(isApproved(6.7))