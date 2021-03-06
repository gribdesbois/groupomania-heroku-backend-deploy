const dotenv = require('dotenv')

dotenv.config()
const http = require('http')
const fs = require('fs')
const app = require('./app')

const { SERVER_KEY, SERVER_CERT, SERVER_WORD } = process.env

const normalizePort = (val) => {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}
const port = normalizePort(process.env.PORT || '443')
app.set('port', port)

const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const address = server.address()
  const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`)
      process.exit(1)
    case 'EADDRINUSE':
      console.error(`${bind} is already in use.`)
      process.exit(1)
    default:
      throw error
  }
}

const server = http.createServer(
  /* {
    key: SERVER_KEY, //! use fs.readFileSync('./key.pem') if stored in local
    cert: SERVER_CERT,
  }, */
  app
)

server.on('error', errorHandler)

/* global.__basedir = __dirname
const initRoutes = require('./routes/file')

initRoutes(app) */

server.on('listening', () => {
  const address = server.address()
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${port}`
  console.log(`Listening on ${bind}`)
})

server.listen(port)
