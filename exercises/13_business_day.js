function isBusinessDay(day) {
  switch (day) {
    case 2:
    case 3:
    case 4:
    case 5:
    case 6: {
      console.log('Business Day !')
      break
    }
    case 1:
    case 7: {
      console.log('Weekend day !')
      break
    }
    default: {
      console.log('Invalid day !')
      break
    }
  }
}

isBusinessDay()
isBusinessDay(1)
isBusinessDay(2)
isBusinessDay(3)
isBusinessDay(4)
isBusinessDay(5)
isBusinessDay(6)
isBusinessDay(7)