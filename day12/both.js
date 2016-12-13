const fs = require('fs')
const path = require('path')
const _ = require('lodash')

var input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' }).split('\r\n')

var compiled = _.map(input, line => {
  return _.map(line.split(' '), v => {
    var n = Number(v)
    return isNaN(v) ? v : n
  })
})

var registers = {
  a: 0,
  b: 0,
  c: 0, // Part 1 = 0, Part 2 = 1
  d: 0
}
var index = 0

function set (a, b) { registers[a] = b }
function get (a) { return typeof a === 'string' ? registers[a] : a }

function step () {
  var ins = compiled[index]
  switch (ins[0]) {
    case 'cpy':
      set(ins[2], get(ins[1]))
      index++
      break
    case 'inc':
      set(ins[1], get(ins[1]) + 1)
      index++
      break
    case 'dec':
      set(ins[1], get(ins[1]) - 1)
      index++
      break
    case 'jnz':
      if (get(ins[1]) !== 0) index += get(ins[2])
      else index++
      break
    default:
      console.log('Unrecognized command "' + ins[0] + '"')
      index++
      break
  }
}

while (true) {
  step()
  if (index >= compiled.length) break
}

console.log(registers)
