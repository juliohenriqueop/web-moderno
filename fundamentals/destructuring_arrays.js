const [element] = [10]
console.log(element)

const [N1, , N3, , N5, N6 = 0] = [10, 7, 9, 8]
console.log(N1, N3, N5, N6)


const [, [, grade]] = [
  [, 8, 8],
  [9, 6, 8]
]
console.log(grade)