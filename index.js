
// const util = require('util')
const co = require('co')
const app = require('http').createServer()
const io = require('socket.io')(app)

const serial = require('./serial')
const print = require('./print')

const onConnection = co.wrap(function * (socket) {
  // socket.emit('news', { hello: 'world' })
  serial((data) => {
    if (data.sensor > 50) {
      socket.emit('coin', { game: true })
    }
  })

  socket.on('finish', function (data) {
    print(data)
  })
})

io.on('connection', onConnection)
app.listen(8000)
