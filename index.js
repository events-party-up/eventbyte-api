#!/usr/bin/env node

// -----------------------------------------------------------------------------

/**
 * Module dependencies.
 */

const app = require("./app")
const debug = require("debug")("express:server")
const http = require("http")

// -----------------------------------------------------------------------------

/**
 * Get port from environment and store in Express.
 */

const HOST = normalizePort(process.env.HOST || "localhost")
const PORT = normalizePort(process.env.PORT || "1337")
app.set("host", HOST)
app.set("port", PORT)

// -----------------------------------------------------------------------------

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

// -----------------------------------------------------------------------------

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(PORT, HOST, err => {
  if (err) console.log(err)
  else console.log(`SERVER IS LISTENING ${HOST}:${PORT}`)
})
server.on("error", onError)
server.on("listening", onListening)

// -----------------------------------------------------------------------------

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10)
  if (isNaN(port)) return val // named pipe
  if (port >= 0) return port // port number
  return false
}

// -----------------------------------------------------------------------------

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") throw error

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges")
      process.exit(1)
      break
    case "EADDRINUSE":
      console.error(bind + " is already in use")
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address()
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port
  debug("LISTENING ON " + bind)
}