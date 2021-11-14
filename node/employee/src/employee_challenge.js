const axios = require('axios')
const url = 'http://files.cod3r.com.br/curso-js/funcionarios.json'

function isChinese(employee) {
  return employee.pais === 'China'
}

function isWoman(employee) {
  return employee.genero === 'F'
}

function getLeastPaid(employee_a, employee_b) {
  return employee_a.salario < employee_b.salario ? employee_a : employee_b
}

function getChineseEmployees(employees) {
  return employees.filter(isChinese)
}

function getFemaleEmployees(employees) {
  return employees.filter(isWoman)
}

function getChineseFemaleEmployees(employees) {
  const chinese_employees = getChineseEmployees(employees)
  return getFemaleEmployees(chinese_employees)
}

function getLeastPaidChineseFemaleEmployee(employees) {
  const chinese_female_employees = getChineseFemaleEmployees(employees)
  const least_paid_chinese_female_employee = chinese_female_employees.reduce(getLeastPaid)

  return least_paid_chinese_female_employee
}

function handleResponse(response) {
  const employees = response.data
  console.log(getLeastPaidChineseFemaleEmployee(employees))
}

function treatError(error) {
  console.log(`Error: ${error.message}.`)
}

axios.get(url).then(handleResponse).catch(treatError)