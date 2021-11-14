function isLeapYear(year) {
  if (year < 0) {
    return false
  } else if ((year % 400) === 0) {
    return true
  } else if ((year % 100) === 0) {
    return false
  } else if ((year % 4) === 0) {
    return true
  }
  return false
}

console.log(isLeapYear(2005))
console.log(isLeapYear(2014))
console.log(isLeapYear(2018))


console.log(isLeapYear(2008))
console.log(isLeapYear(2012))
console.log(isLeapYear(2016))
console.log(isLeapYear(2024))