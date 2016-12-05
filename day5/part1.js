var crypto = require('crypto-js')

// var md5 = CryptoJS.MD5('abc3231929')
// console.log(CryptoJS.enc.Hex.stringify(md5))

var input = 'reyedfim'
var password = ''
var i = 0

while (password.length < 8) {
  var hash = crypto.enc.Hex.stringify(crypto.MD5(input + i))
  if (hash.match(/^00000/) !== null) {
    password += hash[5]
    console.log('i: ' + i + ', pass: ' + password)
  }
  i++
}

console.log('Password: ' + password)
