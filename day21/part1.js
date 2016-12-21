const fs = require('fs')
const path = require('path')
const _ = require('lodash')

var input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' }).split('\r\n')
var word = 'abcdefgh'.split('')

function swap (w, x, y) {
  var t = w[x]
  w[x] = w[y]
  w[y] = t
}

function rotate (w, n) {
  if (n > 0) {
    // Right rotation
    w.unshift(w.pop())
    rotate(w, n - 1)
  } else if (n < 0) {
    // Left rotation
    w.push(w.shift())
    rotate(w, n + 1)
  }
}

function reverse (w, x, y) {
  var n = Math.floor((y - x + 1) / 2)
  for (var i = 0; i < n; ++i) {
    swap(w, x + i, y - i)
  }
}

function move (w, x, y) {
  w.splice(y, 0, w.splice(x, 1)[0])
}

var tests = [
  {
    regex: /^swap position (\d+) with position (\d+)$/,
    func: function (m, w) {
      var x = Number(m[1])
      var y = Number(m[2])
      swap(w, x, y)
    }
  }, {
    regex: /^swap letter (\w) with letter (\w)$/,
    func: function (m, w) {
      var x
      var y
      for (var i = 0; i < w.length; ++i) {
        if (w[i] === m[1]) x = i
        else if (w[i] === m[2]) y = i
      }
      swap(w, x, y)
    }
  }, {
    regex: /^rotate (\w+) (\w) steps?$/,
    func: function (m, w) {
      var dir = m[1] === 'left' ? -1 : 1
      var mag = Number(m[2])
      rotate(w, dir * mag)
    }
  }, {
    regex: /^rotate based on position of letter (\w)$/,
    func: function (m, w) {
      var x
      for (var i = 0; i < w.length; ++i) {
        if (m[1] === w[i]) {
          rotate(w, 1 + i + (i >= 4 ? 1 : 0))
          break
        }
      }
    }
  }, {
    regex: /^reverse positions (\d+) through (\d+)$/,
    func: function (m, w) {
      var x = Number(m[1])
      var y = Number(m[2])
      reverse(w, x, y)
    }
  }, {
    regex: /^move position (\d+) to position (\d+)$/,
    func: function (m, w) {
      var x = Number(m[1])
      var y = Number(m[2])
      move(w, x, y)
    }
  }
]

_.each(input, cmd => {
  var found = false
  for (var i = 0; i < tests.length; ++i) {
    var m = cmd.match(tests[i].regex)
    if (m) {
      found = true
      tests[i].func(m, word)
      break
    }
  }
  if (!found) {
    console.log('Unknown cmd:', cmd)
  }
})

console.log('-------\nPassword: ' + word.join(''))
