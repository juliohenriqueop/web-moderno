function Person() {
  this.age = 0

  setInterval(() => {
    this.age++
    console.log('Age:', this.age)
  }, 1000)
}

new Person