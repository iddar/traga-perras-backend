const co = require('co')
const pug = require('pug')
const _ = require('lodash')

const imageResolve = require('./imageResolve')
const save = require('./save')

const pathPug = __dirname + '/template/index.pug'
const pathHtml = __dirname + '/template/index.html'
const pathPdf = __dirname + '/template/index.pdf'
const cssPath = __dirname + '/template/print.css'

const str = require('fs').readFileSync(pathPug, 'utf8')
const template = pug.compile(str, { filename: pathPug, pretty: true })

module.exports = co.wrap(function * (data) {
  const results = data.results
  const win = data.win

  console.warn(results, win)
  if (!win) {
    return
  }

  try {
    let img = yield imageResolve(results[0])

    let html = template({
      name: 'iddar',
      img: img
    })

    yield save.html(pathHtml, html)
    yield save.pdf(pathPdf, pathHtml, cssPath)
    yield save.print(pathPdf)
  } catch (e) {
    console.error('Error:', e)
  }

  console.log('Done...')
})
