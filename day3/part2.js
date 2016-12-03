const fs = require('fs')
const path = require('path')
const _ = require('lodash')

var input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' })

input = input.split('\r')

input = _.flatten(_.map(input, function (o) {
  return _.map(_.compact(o.replace(/\s+/, ' ').trim().split(' ')), function (k) {
    return Number(k)
  })
}))

var count = 0
for (var k = 0; k < input.length; k += 9) {
  for (var n = k; n < k + 3; ++n) {
    count += input[n] + input[n + 3] > input[n + 6] && input[n] + input[n + 6] > input[n + 3] && input[n + 3] + input[n + 6] > input[n] ? 1 : 0
  }
}

console.log(count)
