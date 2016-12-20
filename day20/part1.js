const fs = require('fs')
const path = require('path')
const _ = require('lodash')

var input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' }).split('\r\n')

input = _.map(input, v => {
  v = v.split(/-/)
  return { start: Number(v[0]), end: Number(v[1]) }
})

function getRange (m) {
  for (var i = 0; i < input.length; ++i) if (input[i].start <= maxRange + 1) return input.splice(i, 1)[0]
}

var maxRange = 0
// Find a start <= maxRange
while (true) {
  var range = getRange(maxRange)
  if (!range) break
  else maxRange = Math.max(maxRange, range.end)
}

console.log('Free IP = ' + (maxRange + 1))
