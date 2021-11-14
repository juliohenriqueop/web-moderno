const obj1 = {}

console.log(obj1, '-', typeof obj1)

console.log(typeof Object, '-', typeof new Object)



const obj2 = new Object

console.log(obj2, '-', typeof obj2)



function Product(name, price, discount) {
  this.name = name
  this.getDiscountedPrice = () => price - ((price / 100) * discount)
}

const smartphone = new Product('iPhone X', 3999.90, 5)
const notebook = new Product('MacBook Pro', 8999.90, 10)

console.log(smartphone.getDiscountedPrice())

console.log(notebook.getDiscountedPrice())



function createEmployee(name, salary, absences) {
  return {
    name,
    salary,
    absences,

    getDiscountedSalary: () => (salary / 30) * (30 - absences)
  }
}

const employees = [
  createEmployee('João', 7980, 4),
  createEmployee('Maria', 11400, 1)
]

console.log(employees[0].getDiscountedSalary())

console.log(employees[1].getDiscountedSalary())



const obj3 = Object.create(null)
console.log(obj3, '-', typeof obj3)


const fromJSON = JSON.parse('{ "hello": "Hello From JSON !" }')

console.log(fromJSON.hello)