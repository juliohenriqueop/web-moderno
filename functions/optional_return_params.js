function areaOf(width, height) {
  const area = width * height

  if (area > 20) {
    console.log(`Area value is higher than allowed (${area}).`)
  } else {
    return area
  }
}

console.log(areaOf(2, 2))
console.log(areaOf(2))
console.log(areaOf())
console.log(areaOf(2, 3, 17, 22, 44))
console.log(areaOf(5, 5))