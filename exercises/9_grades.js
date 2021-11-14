function round(value) {
  const module = value % 5
  return module > 2 ? value + (5 - module) : value
}

function isApproved(grade) {
  if (grade >= 38) {
    console.log('Approved, grade:', round(grade))
  } else {
    console.log('Reproved, grade:', grade)
  }
}

isApproved(57)

isApproved(38)

isApproved(84)

isApproved(37)

isApproved(29)