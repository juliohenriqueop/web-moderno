function formatCurrency(value, currency = 'R$') {
  return `${currency}${value.toFixed(2)}`.replace('.', ',')
}

console.log(formatCurrency((0.1 + 0.2)))