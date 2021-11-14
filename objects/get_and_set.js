const sequence = {
  _value: 1,

  get value() {
    return this._value++
  },

  set value(new_value) {
    if (new_value > this._value)
      this._value = new_value
  }
}

console.log(sequence.value, sequence.value)



sequence.value = 1000

console.log(sequence.value, sequence.value)



sequence.value = 100

console.log(sequence.value)