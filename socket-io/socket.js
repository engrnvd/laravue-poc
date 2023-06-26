require('dotenv').config({ path: '../.env' })
let http = require('http').createServer()
let ioOptions = {
    cors: { origin: new RegExp(process.env.ALLOWED_ORIGIN_PATTERN) }
}
const { Server } = require("socket.io")
const io = new Server(http, ioOptions)
const Redis = require('ioredis')
const axios = require("axios")
const redis = new Redis(`redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`)

const redisChannel = process.env.SOCKET_IO_CHANNEL || 'socket-io'
redis.subscribe(redisChannel, (err, channelsCount) => {
    if (err) console.error("Failed to subscribe to redis: %s", err.message)
    else console.log(`Subscribed successfully to redis`)
})

redis.on('message', function (channel, message) {
    console.log('message on', channel, ":", message)
    message = JSON.parse(message)
    const _io = message.room ? io.to(message.room) : io
    _io.emit(message.event, message.data)
})

io.on('connection', function (socket) {
    const token = socket.handshake.auth.token
    if (token) {
        axios.get(`http://laravel.app:8000/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log('auth success:', res.data)
            socket.join(`${process.env.SOCKET_IO_USER_ROOM}-${res.data.id}`)
        }).catch(res => {
            console.log('error', res)
        })
    } else {
        socket.join(process.env.SOCKET_IO_PUBLIC_ROOM)
    }

    socket.on("error", (err) => {
        console.log('err', err)
        if (err && err.message === "unauthorized") {
            socket.disconnect()
        }
    })

    socket.on('disconnecting', (reason) => {
        socket.emit('disconnected', { pid: socket.id, referer: socket.handshake.headers.referer })
    })
})

const port = process.env.SOCKET_IO_PORT || 3210

http.listen(port, function () {
    console.log(`Node server is running socket.js on port ${port}`)
})
