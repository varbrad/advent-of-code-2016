const fs = require('fs')
const path = require('path')
const _ = require('lodash')

var input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' }).split('\r\n')

input = _.map(input, function (ins) {
  let setValue = ins.match(/value ([\d]+) goes to ([\w]+) ([\d]+)/)
  let doValue = ins.match(/([\w]+) ([\d]+) gives low to ([\w]+) ([\d]+) and high to ([\w]+) ([\d]+)/)

  if (setValue) {
    return {
      target: setValue[2] + '-' + setValue[3],
      value: Number(setValue[1])
    }
  } else if (doValue) {
    return {
      source: doValue[1] + '-' + doValue[2],
      low: doValue[3] + '-' + doValue[4],
      high: doValue[5] + '-' + doValue[6]
    }
  }
})

var factory = {}

function give (src, val) {
  factory[src] = factory[src] || []
  factory[src].push(val)
}

while (input.length > 0) {
  input = _.filter(input, ins => {
    if (ins.target) {
      give(ins.target, ins.value)
      return false
    } else if (ins.source && factory[ins.source] && factory[ins.source].length === 2) {
      factory[ins.source].sort((a, b) => a > b ? 1 : -1)
      if (factory[ins.source][0] === 17 && factory[ins.source][1] === 61) {
        console.log('Comparing 17 & 61 - ' + ins.source)
      }
      give(ins.low, factory[ins.source][0])
      give(ins.high, factory[ins.source][1])
      return false
    }
    return true
  })
}

var mult = factory['output-0'] * factory['output-1'] * factory['output-2']
console.log('Output product = ' + mult)
