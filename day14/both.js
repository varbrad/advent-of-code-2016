const crypto = require('crypto')

const input = 'qzyelonm'

const hashes = []

function getHash1 (v) {
  if (!hashes[v]) hashes[v] = crypto.createHash('md5').update(input + String(v)).digest('hex')
  return hashes[v]
}

function getHash2 (v) {
  if (!hashes[v]) {
    var a = input + String(v)
    for (var i = 0; i < 2017; ++i) {
      a = crypto.createHash('md5').update(a).digest('hex')
    }
    hashes[v] = a
  }
  return hashes[v]
}

var keys = 0
var current = 0

// for part 1
var doHash = getHash1
// for part 2 (uncomment out)
// doHash = getHash2

var time = new Date().getTime()

while (true) {
  var hash = doHash(current)
  var match = hash.match(/(\w)\1\1/)
  if (match) {
    var regex = new RegExp(new Array(6).join(match[1]))
    for (var n = current + 1; n < current + 1001; ++n) {
      if (doHash(n).match(regex)) {
        keys++
        console.log('Key #' + keys + ' found at i = ' + current)
        break
      }
    }
  }
  if (keys === 64) {
    console.log('64 Keys found.')
    console.log('Last index was ' + current)
    break
  }
  hashes[current] = null
  current++
}

console.log('Took ' + (new Date().getTime() - time) + 'ms to run')
