const from0to10 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for (let i in from0to10) {
  if (i == 5)
    break

  console.log(`(break) - from0to10[${i}]:`, from0to10[i])
}

for (let i in from0to10) {
  if (i == 5)
    continue

  console.log(`(continue) - from0to10[${i}]:`, from0to10[i])
}


outer: for (let x in from0to10) {
  inner: for (let y in from0to10) {
    if (x == 2 && y == 3)
      break outer

    console.log(`(label) - x:[${x}], y:[${y}]`)
  }
}