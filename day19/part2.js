var input =  3014387

function largest3n2() {
  var s = 2
  while (s < input) {
    s = s * 3 - 2
  }
  return (s + 2) / 3
}

var largestN = largest3n2()

var winner = input - largestN + 1

if (winner >= largestN) {
  winner = winner * 2 - 9
}

console.log('Winner = ' + winner)
