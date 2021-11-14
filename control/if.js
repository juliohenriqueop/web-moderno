function goodNewsOnly(grade) {
  if (grade >= 7) {
    console.log('Approved, grade:', grade)
  }
}

goodNewsOnly(8.7)
goodNewsOnly(6.1)


function sayTheTruth(value) {
  if (value) {
    console.log('The truth:', `'${value}'`)
  }
}

sayTheTruth()
sayTheTruth(null)
sayTheTruth(undefined)
sayTheTruth(NaN)
sayTheTruth('')
sayTheTruth(0)

sayTheTruth(-1)
sayTheTruth(' ')
sayTheTruth('?')
sayTheTruth([])
sayTheTruth([1, 2])
sayTheTruth({})