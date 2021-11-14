function Person() {
  this.age = 0

  const self = this

  setInterval(function() {
    self.age++
    console.log('Age:', self.age)
  }, 1000)
}

new Person