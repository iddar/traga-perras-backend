const fs = require('fs')

const imageResolve = img => `${__dirname}/images/${img}.jpg`

module.exports = function (name) {
  return new Promise((resolve, reject) => {
    fs.readFile(imageResolve(name), (error, data) => {
      if (error) return reject(error)
      resolve(data.toString('base64'))
    })
  })
}
