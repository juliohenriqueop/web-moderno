function getPerformanceInfo(values) {
  let record_breaks = 0
  let best_score = 0
  let best_match = 0
  let worse_score = 0
  let worse_match = 0

  const scores = values.split(' ')

  scores.forEach((current_score, index) => {
    current_score = Number(current_score)

    if (index === 0) {
      best_score = current_score
      best_match = index + 1
      worse_score = current_score
      worse_match = index + 1
    } else if (current_score > best_score) {
      best_score = current_score
      best_match = index + 1
      record_breaks++
    } else if (current_score < worse_score) {
      worse_score = current_score
      worse_match = index + 1
    }
  })

  return {
    record_breaks,
    best: {
      score: best_score,
      match: best_match
    },
    worse: {
      score: worse_score,
      match: worse_match
    }
  }
}

console.log(getPerformanceInfo('10 20 20 8 25 3 0 30 1'))

console.log(getPerformanceInfo('5 4 3 2 1'))