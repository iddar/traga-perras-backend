const printer = require('printer')
// const util = require('util')
const pug = require('pug')
const co = require('co')

const imageResolve = require('./imageResolve')
const save = require('./save')

const pathPug = __dirname + '/template/index.pug'
const pathHtml = __dirname + '/template/index.html'
const pathPdf = __dirname + '/template/index.pdf'
const str = require('fs').readFileSync(pathPug, 'utf8')

const fn = pug.compile(str, { filename: pathPug, pretty: true })

co(function * () {
  let img = yield imageResolve('img')
  let html = fn({
    name: 'iddar',
    img: img
  })

  yield save.html(pathHtml, html)
  yield save.pdf(pathPdf, pathHtml)

  console.log('Done...')
  console.log('default printer name: ' + (printer.getDefaultPrinterName() || 'is not defined on your computer'))
})

// console.log('installed printers:\n' + util.inspect(printer.getPrinters(), {colors: true, depth: 10}))

// pdf.create(html).toFile([filepath, ]function(err, res){
//   console.log(res.filename);
// })

// pdf()
//   .from.string(html)
//   .to.path(pathPdf, (err) => {
//     if (err) return console.error(err)
//     console.log('pdf ok')
//   })
