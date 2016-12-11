const fs = require('fs')
const path = require('path')
const _ = require('lodash')

var input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' }).split('\n')

var valids = 0

_.each(input, function (ip) {
  var invalid = ip.match(/\[\w*(\w)(\w)\2\1\w*\]/)
  var valid = ip.match(/(\w)(\w)\2\1/)
  if ((invalid === null || invalid[1] === invalid[2]) && (valid && valid[1] !== valid[2])) valids++
})

console.log(valids)
