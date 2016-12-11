const fs = require('fs')
const path = require('path')
const _ = require('lodash')

var input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' }).split('\r\n')

var screen = []
for (var y = 0; y < 6; ++y) {
  screen[y] = []
  for (var x = 0; x < 50; ++x) {
    screen[y][x] = 0 // 0 = Off, 1 = On
  }
}

_.each(input, ins => {
  let rect = ins.match(/rect ([\d]+)x([\d]+)/)
  let row = ins.match(/rotate row y=([\d]+) by ([\d]+)/)
  let col = ins.match(/rotate column x=([\d]+) by ([\d]+)/)
  if (rect) {
    //
    for (let y = 0; y < Number(rect[2]); ++y) {
      for (let x = 0; x < Number(rect[1]); ++x) {
        screen[y][x] = 1
      }
    }
    //
  } else if (row) {
    let y = Number(row[1])
    let dy = Number(row[2])
    for (var i = 0; i < dy; ++i) {
      screen[y].unshift(screen[y].pop())
    }
  } else if (col) {
    let x = Number(col[1])
    let dx = Number(col[2])
    for (var k = 0; k < dx; ++k) {
      let last = screen[screen.length - 1][x]
      for (var y = screen.length - 1; y > 0; --y) {
        screen[y][x] = screen[y - 1][x]
      }
      screen[0][x] = last
    }
  } else {
    console.log('Unknown command')
  }
})

console.log('Pixels active: ' + _.sum(_.flatten(screen)))

var msg = ''
_.each(screen, row => {
  _.each(row, pixel => {
    msg += pixel === 1 ? '▓' : '░'
  })
  msg += '\n'
})
console.log(msg)
