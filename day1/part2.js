const fs = require('fs')
const path = require('path')

var input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' })

input = input.split(', ')

console.log('Number of commands: ' + input.length)

var pos = {
  x: 0,
  y: 0,
  dir: 'N'
}

var places = {

}

function turn (way) {
  switch(pos.dir) {
    case 'N':
      pos.dir = way == 'R' ? 'E' : 'W'
      return
    case 'E':
      pos.dir = way == 'R' ? 'S' : 'N'
      return
    case 'S':
      pos.dir = way == 'R' ? 'W' : 'E'
      return
    case 'W':
      pos.dir = way == 'R' ? 'N' : 'S'
      return
  }
}

function move (steps) {
  for (let i = 0; i < steps; ++i) {
    switch (pos.dir) {
      case 'N':
        pos.y -= 1
        break
      case 'E':
        pos.x += 1
        break
      case 'S':
        pos.y += 1
        break
      case 'W':
        pos.x -= 1
        break
    }
    //
    var p = pos.x + ',' + pos.y
    if (places[p] === true) {
      return true
    } else {
      places[p] = true
    }
  }
  return false
}

for(let i = 0; i < input.length; ++i) {
  let cmd = input[i]
  turn(cmd[0])
  var revisit = move(Number(cmd.substring(1, cmd.length)))
  if (revisit) {
    console.log('Final X: ' + pos.x + ', Final Y: ' + pos.y)
    console.log('Shortest Distance: ' + (Math.abs(pos.x) + Math.abs(pos.y)))
    break
  }
}
