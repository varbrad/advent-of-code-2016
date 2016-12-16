var discs = [
  { states: 17, start: 5 },
  { states: 19, start: 8 },
  { states: 7, start: 1 },
  { states: 13, start: 7 },
  { states: 5, start: 1 },
  { states: 3, start: 0 },
]

// For Day 2, uncomment the following line
// discs.push({ states: 11, start: 0 })

for (let i = 0; i < discs.length; ++i) {
  var disc = discs[i]
  disc.pos = disc.states - i - 1
  while (disc.pos < 0) disc.pos += disc.states
}

var n = 0
while (n < 10000000) {
  var flag = false
  for (let k = 0; k < discs.length; ++k) {
    var disc = discs[k]
    if ((disc.start + n) % disc.states !== disc.pos) break
    else if (k === discs.length - 1) flag = true
  }

  if (flag) {
    console.log('n = ' + n)
    return
  } else {
    n++
  }
}

console.log('Found nothing')
