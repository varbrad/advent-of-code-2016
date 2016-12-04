const fs = require('fs')
const path = require('path')
const _ = require('lodash')

var input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' }).split('\r')

input = _.map(input, function (v) {
  var sector = Number(v.match(/(\d+)/)[1])
  var charShift = sector % 26
  var name = v.match(/([(a-z)-]+)/)[1].replace(/-/g, ' ')
  return {
    name: _.map(name, (char) => {
      // 97 = a, 122 = z
      if (char === ' ') return char
      var code = char.charCodeAt(0) + charShift
      return String.fromCharCode(code > 122 ? code - 26 : code)
    }).join(''),
    sector: sector
  }
})

console.log(_.filter(input, (v) => v.name.match(/northpole object storage/) !== null))
