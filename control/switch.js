function isApproved(grade) {
  switch (Math.floor(grade)) {
    case 9:
    case 10:
      console.log('Approved as TOP student, grade:', grade)
      break;
    case 7:
    case 8:
      console.log('Approved, grade:', grade)
      break
    case 4:
    case 5:
    case 6:
      console.log('Not approved, should retry, grade:', grade)
      break
    case 0:
    case 1:
    case 3:
      console.log('Reproved, grade:', grade)
      break
    default:
      console.log('Invalid grade.')
      break
  }
}

isApproved(9)
isApproved(7.1)
isApproved(5)
isApproved(3.1)
isApproved(-1)
isApproved(11)