class Grandparent {
  constructor(surname) {
    this.surname = surname
  }
}

class Parent extends Grandparent {
  constructor(surname, occupation = 'Teacher') {
    super(surname)
    this.occupation = occupation
  }
}

class Child extends Parent {
  constructor(name) {
    super('Silva')
    this.name = name
  }
}

const child = new Child('Alberto')
console.log(child)