const fs = require('fs')
const path = require('path')
const _ = require('lodash')

var input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' })

input = input.split('\r')

input = _.map(input, function (o) {
  return _.map(_.compact(o.replace(/\s+/, ' ').trim().split(' ')), function (k) {
    return Number(k)
  })
})

console.log(_.filter(input, function (o) {
  return o[0] + o[1] > o[2] && o[0] + o[2] > o[1] && o[1] + o[2] > o[0]
}).length)
