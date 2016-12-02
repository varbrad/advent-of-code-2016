const fs = require('fs')
const path = require('path')

var input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' })

input = input.split('\r')

var key = 5

for (var i = 0; i < input.length; ++i) {
  var commands = input[i]
  for (var k = 0; k < commands.length; ++k) {
    switch (commands[k]) {
      case 'U':
        // Can always move up if current key is 4 or larger
        if (key >= 4) key -= 3
        break
      case 'D':
        // Can always move down if current key is 6 or less
        if (key <= 6) key += 3
        break
      case 'L':
        // Can only move left if key not 1, 4 or 7
        if (key !== 1 && key !== 4 && key !== 7) key--
        break
      case 'R':
        // Can only move right if key not 3, 6 or 9
        if (key !== 3 && key !== 6 && key !== 9) key++
        break
    }
  }
  console.log(key)
}