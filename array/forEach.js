const approved_ones = ['Agatha', 'Aldo', 'Daniel', 'Raquel']

approved_ones.forEach(function(name, index) {
  console.log(`${index + 1} = ${name}`)
})

approved_ones.forEach(name => console.log(name))

const showApprovedOnes = approved => console.log(approved)

approved_ones.forEach(showApprovedOnes)