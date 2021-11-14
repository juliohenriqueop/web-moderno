for (let character of 'String') {
  console.log(character)
}



const techs = ['ReactJS', 'Angular', 'VueJS']

for (let tech of techs) {
  console.log(tech)
}



const tech_info = new Map([
  ['ReactJS', {
    framework: false
  }],
  ['Angular', {
    framework: true
  }],
  ['VueJS', {
    framework: true
  }]
])

for (let tech of tech_info) {
  console.log(tech)
}

for (let name of tech_info.keys()) {
  console.log(name)
}

for (let info of tech_info.values()) {
  console.log(info)
}

for (let [name, info] of tech_info.entries()) {
  console.log('Key:', name, '-', 'Value:', info)
}



const vowels = new Set(['a', 'e', 'i', 'o', 'u'])

for (vow of vowels) {
  console.log(vow)
}