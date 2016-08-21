const fs = require('fs')
const pdf = require('html5-to-pdf')

const savePDF = function (path, html) {
  return new Promise((resolve, reject) => {
    pdf()
      .from(html)
      .to(path, function (error) {
        if (error) return reject(error)
        resolve()
      })
  })
}

const saveHTML = function (path, html) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, html, (error) => {
      if (error) return reject(error)
      resolve()
    })
  })
}

module.exports = {
  pdf: savePDF,
  html: saveHTML
}
