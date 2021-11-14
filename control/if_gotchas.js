function greaterThanSeven(value) {

  if (value > 7)
    console.log(true)

  console.log('???')
}
greaterThanSeven(6)

greaterThanSeven(8)


function greaterThanSevenWithABug(value) {
  if (value > 7); {
    console.log(true)
  }
}

greaterThanSevenWithABug(6)
greaterThanSevenWithABug(8)