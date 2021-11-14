const approved_ones = ['Agatha', 'Aldo', 'Daniel', 'Raquel']

Array.prototype.myForEach = function(callbackfn) {
  for (let index = 0; index < this.length; index++) {
    callbackfn(this[index], index, this)
  }
}

approved_ones.myForEach((name, index, arr) => {
  console.log(`${index + 1} = ${name}`)
})