var data = '01111010110010011'
var diskSize = 272

function step (a) {
  var b = a.split('').reverse()
  for (let i = 0; i < b.length; ++i) {
    b[i] = b[i] === '0' ? '1' : '0'
  }
  return a + '0' + b.join('')
}

while (data.length < diskSize) {
  data = step(data)
}
data = data.substr(0, diskSize)

function checksum (a) {
  var r = ''
  for (let i = 0; i < a.length; i += 2) r += a[i] === a[i+1] ? '1' : '0'
  return r
}

while (data.length % 2 === 0) {
  data = checksum(data)
}

console.log('Checksum: ' + data)
