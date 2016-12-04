const fs = require('fs')
const path = require('path')
const _ = require('lodash')

var input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' }).split('\r')

var sectors = 0

_.each(input, function (v) {
  var name = _.groupBy(v.match(/([(a-z)-]+)/)[1].replace(/-/g, ''), (o) => o)
  var l = []
  _.forIn(name, (v, k) => {
    l.push({ letter: k, count: v.length })
  })
  l.sort(function (a, b) { return a.count < b.count ? 1 : -1 })
  var chksum = []
  var lastCount = null
  for (var i = 0; i < l.length; ++i) {
    var key = l[i].letter
    var count = l[i].count
    if (lastCount !== count) {
      chksum.push([key])
      lastCount = count
      continue
    } else {
      chksum[chksum.length - 1].push(key)
      continue
    }
  }
  _.each(chksum, (v) => v.sort())
  chksum = _.flatten(chksum)
  chksum.length = 5
  chksum = chksum.join('')
  if (v.match(/\[(\w+)]/)[1] === chksum) { // Regex is the checksum
    sectors += Number(v.match(/(\d+)/)[1]) // Sector ID code
  }
})

console.log(sectors)
