const scheduler = require('node-schedule')

function getTime() {
  const date = new Date()
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

const rule = new scheduler.RecurrenceRule()
rule.year = 2020
rule.month = 2
rule.dayOfWeek = [new scheduler.Range(1, 6)]
rule.hour = 21
rule.second = 30

const task = scheduler.scheduleJob(rule, () => {
  console.log(`Task is running. [${getTime()}]`)
})

setTimeout(() => {
  task.cancel()
}, 120000)