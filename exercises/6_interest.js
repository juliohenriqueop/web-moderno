function isAllValid() {
  for (let i in arguments) {
    if (!Number.isFinite(arguments[i]) || arguments[i] <= 0) {
      return false
    }
  }

  return true
}

function formatCurrency(value, currency = 'R$') {
  return `${currency}${value.toFixed(2)}`.replace('.', ',')
}

function applySimpleInterest(principal, rate_percentage, periods) {

  if (!isAllValid(principal, rate_percentage, periods)) {
    return 0
  }

  return principal + (principal * ((rate_percentage / 100) * periods))
}

function applyCompoundInterest(principal, rate_percentage, frequency, periods) {

  if (!isAllValid(principal, rate_percentage, frequency, periods)) {
    return 0
  }

  return principal * (1 + ((rate_percentage / 100) / frequency)) ** (frequency * periods)
}

const simple_interest = applySimpleInterest(1000, 5, 10)
const compound_interest = applyCompoundInterest(1000, 5, 12, 10)

if (simple_interest && compound_interest) {
  console.log(formatCurrency(simple_interest))
  console.log(formatCurrency(compound_interest))
} else {
  console.log('Error: all values should be numeric and greater than 0.')
}