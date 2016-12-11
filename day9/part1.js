const fs = require('fs')
const path = require('path')
const _ = require('lodash')

var input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' })
var output = ''

while (true) {
  var match = input.match(/\(([\d]+)x([\d]+)\)/)
  if (match === null) break
  // Match is not null
  // Put first bit of string from 0 to index in the output
  output += input.substring(0, match.index)
  // Repeating section
  var section = input.substring(match.index + match[0].length, match.index + match[0].length + Number(match[1]))
  var result = Array(Number(match[2]) + 1).join(section)
  //
  output += result
  input = input.substring(match.index + match[0].length + section.length, input.length)
}

output += input // Add last bits

console.log(output)
console.log('Length: ' + output.length)
