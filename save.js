const fs = require('fs')
const printer = require('printer')
const pdf = require('html5-to-pdf')

console.log('default printer name: ' + (printer.getDefaultPrinterName() || 'is not defined on your computer'))

const savePDF = function (path, html, cssPath) {
  return new Promise((resolve, reject) => {
    pdf({cssPath})
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

const print = function (file) {
  return new Promise((resolve, reject) => {
    printer.printFile({
      filename: file,
      success: resolve,
      error: reject
    })
  })
}

module.exports = {
  pdf: savePDF,
  html: saveHTML,
  print: print
}
