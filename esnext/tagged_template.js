function tag(string_content_array, ...interpolated_content_array) {
  console.log(string_content_array)
  console.log(interpolated_content_array)

  return 'resulting string'
}

const a = 1
const b = 2

console.log(tag `${a}, ${b} !`)