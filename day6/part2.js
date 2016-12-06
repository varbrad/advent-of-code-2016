const fs = require('fs')
const path = require('path')
const _ = require('lodash')

var input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' }).split('\n')

var counts = [
  {}, {}, {}, {}, {}, {}, {}, {}
]

_.each(input, function (code, a) {
  _.each(code, function (char, b) {
    if (counts[b][char] === undefined) {
      counts[b][char] = { char: char, count: 1}
    } else {
      counts[b][char].count++
    }
  })
})

counts = _.map(counts, function (pos, i) {
  pos = _.values(pos)
  pos.sort(function (a, b) { return a.count > b.count ? 1 : -1 }) // Easiest 2nd part so far...
  return pos[0].char
})

console.log(_.flatten(counts).join(''))
