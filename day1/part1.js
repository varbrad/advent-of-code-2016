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
  switch (pos.dir) {
    case 'N':
      pos.y -= steps
      return
    case 'E':
      pos.x += steps
      return
    case 'S':
      pos.y += steps
      return
    case 'W':
      pos.x -= steps
      return
  }
}

for(let i = 0; i < input.length; ++i) {
  let cmd = input[i]
  turn(cmd[0])
  move(Number(cmd.substring(1,cmd.length)))
  console.log('CMD: ' + cmd + ' - Direction: ' + pos.dir + ' - Pos: ' + pos.x + ', ' + pos.y)
}

console.log('Final X: ' + pos.x + ', Final Y: ' + pos.y)
console.log('Shortest Distance: ' + (Math.abs(pos.x) + Math.abs(pos.y)))
