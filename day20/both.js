const fs = require('fs')
const path = require('path')
const _ = require('lodash')

var input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' }).split('\r\n')

input = _.map(input, v => {
  v = v.split(/-/)
  return { start: Number(v[0]), end: Number(v[1]) }
})

input.sort((a, b) => a.start > b.start ? 1 : -1)


var flag = true
while (flag) {
  flag = false
  for (var i = 0; i < input.length; ++i) {
    var range = input[i]
    for (var j = input.length - 1; j > i; --j) {
      var range2 = input[j]
      if (range.end + 1 >= range2.start) {
        range.start = Math.min(range.start, range2.start)
        range.end = Math.max(range.end, range2.end)
        input.splice(j, 1)
        flag = true
      }
    }
  }
}

var taken = 0
_.each(input, v => {
  taken += v.end - v.start + 1
})

console.log('First Free IP: ' + (input[0].end + 1))
console.log('Free IP total: ' + (4294967295 - taken + 1)) // Off by 1 as 0th IP doesnt get counted
