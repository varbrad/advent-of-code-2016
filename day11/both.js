/**
 * Initially solved by hand, until managing to generalise the solution and realising
 * that each move all items from floor 'n' to floor 'n+1' takes the double of the
 * current item count - 1 and then subtract 1 (as no move needed to go back down to the initial floor)
 * I think this would work with any input.
 */

const _ = require('lodash')

var input = [
  [4, 5, 1, 0],
  [8, 5, 1, 0]
]

function calc (i) {
  var count = 0
  var list = input[i]
  for (var k = 0; k < 3; ++k) {
    count += 2 * (list[k] - 1) - 1
    list[k + 1] += list[k]
  }
  return count
}

console.log('Part 1: ' + calc(0))
console.log('Part 2: ' + calc(1))
