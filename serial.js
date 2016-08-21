
const serialport = require('serialport')
const SerialPort = serialport.SerialPort

const conf = 	{
  baudrate: 9600,
  parser: serialport.parsers.readline('\n')
}

module.exports = function (callback) {
  const port = new SerialPort('/dev/tty.usbmodem1411', conf)

  port.on('data', function (line) {
    try {
      var data = JSON.parse(line)
      callback(data)
    } catch (e) {
      console.error(e)
    }
  })

  return port
}
