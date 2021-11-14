function Car(max_speed = 200, acceleration = 5) {


  let current_speed = 0

  this.accelerate = function() {
    if (current_speed + acceleration <= max_speed) {
      current_speed += acceleration
    } else {
      current_speed = max_speed
    }
  }

  this.getCurrentSpeed = function() {
    return current_speed
  }
}



const uno = new Car

console.log('Uno:', uno.getCurrentSpeed())

uno.accelerate()

console.log('Uno:', uno.getCurrentSpeed())

uno.accelerate()

console.log('Uno:', uno.getCurrentSpeed())



const ferrari = new Car(320, 60)

console.log('Ferrari:', ferrari.getCurrentSpeed())

ferrari.accelerate()

console.log('Ferrari:', ferrari.getCurrentSpeed())

ferrari.accelerate()

console.log('Ferrari:', ferrari.getCurrentSpeed())