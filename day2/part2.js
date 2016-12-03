const fs = require('fs')
const path = require('path')

var input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' })

input = input.split('\r')

var keypad = [
  [0, 0, 1, 0, 0],
  [0, 2, 3, 4, 0],
  [5, 6, 7, 8, 9],
  [0, 'A', 'B', 'C', 0],
  [0, 0, 'D', 0, 0]
]

var x = 0
var y = 2

for (var i = 0; i < input.length; ++i) {
  var commands = input[i]
  for (var k = 0; k < commands.length; ++k) {
    switch (commands[k]) {
      case 'U':
        // Only try to move up if Y >= 1 && key[y-1][x] !== 0
        if (y >= 1 && keypad[y - 1][x] !== 0) y--
        break
      case 'D':
        if (y <= 3 && keypad[y + 1][x] !== 0) y++
        break
      case 'L':
        if (x >= 1 && keypad[y][x - 1] !== 0) x--
        break
      case 'R':
        if (x <= 3 && keypad[y][x + 1] !== 0) x++
        break
    }
  }
  console.log(keypad[y][x])
}
