Object.prototype.zero = 0

const grandparent = {
  a: 'A'
}

const parent = {
  __proto__: grandparent,
  b: 'B'
}

const child = {
  __proto__: parent,
  c: 'C'
}

console.log(child.zero, child.a, child.b, child.c)



const car = {
  current_speed: 0,
  max_speed: 200,

  accelerate(acceleration) {
    if ((this.current_speed + this.acceleration) < this.max_speed) {
      this.current_speed += acceleration
    } else {
      this.current_speed = this.max_speed
    }
  },

  status() {
    return `${this.current_speed}Km/h de ${this.max_speed}Km/h`
  }
}

const ferrari = {
  model: 'F40',
  max_speed: 324
}

const volvo = {
  model: 'V40',

  status() {
    return `${this.model}: ${super.status()}`
  }
}

Object.setPrototypeOf(ferrari, car)
Object.setPrototypeOf(volvo, car)

volvo.accelerate(100)
console.log(volvo.status())

ferrari.accelerate()
console.log(ferrari.status())

console.log(ferrari.zero)
console.log(volvo.zero)