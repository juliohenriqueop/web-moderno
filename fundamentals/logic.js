function goToShopping(JOB1, JOB2) {

  const buy_ice_cream = JOB1 || JOB1

  const buy_50_inch_tv = JOB1 && JOB2

  const buy_32_inch_tv = JOB1 != JOB2

  const be_healthier = !buy_ice_cream

  return {
    buy_ice_cream,
    buy_50_inch_tv,
    buy_32_inch_tv,
    be_healthier
  }
}

console.log(goToShopping(true, true))


console.log(goToShopping(true, false))
console.log(goToShopping(false, true))


console.log(goToShopping(false, false))