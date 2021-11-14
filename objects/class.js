class Bill {
  constructor(name, value) {
    this.name = name
    this.value = value
  }
}

class Period {
  constructor(month, year) {
    this.month = month
    this.year = year
    this.bills = []
  }

  addBill(...bills) {
    bills.forEach(bill => this.bills.push(bill))
  }

  summary() {
    let final_value = 0

    this.bills.forEach(bill => {
      final_value += bill.value
    })

    return final_value
  }
}

const salary = new Bill('Salary', 45000)
const income = new Bill('Stocks', 8952.47)

const mortgage = new Bill('Mortgage', -19000)
const light = new Bill('Light', 582.23)
const shopping = new Bill('Shopping', 1945.75)

const june_bills = new Period(6, 2018)
june_bills.addBill(salary, income, mortgage, light, shopping)

console.log(june_bills.summary())