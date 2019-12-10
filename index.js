const http = require('http')
const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile)

const Koa = require('koa')

const app = new Koa()
const server = http.createServer(app.callback())
const io = require('socket.io')(server)

io.on('connection', socket => {
  console.log('connected')
  socket.on('message', message => {
    console.log(message)
    io.emit('message', message)
  })
})

app.use(async ctx => {
  if (ctx.URL.pathname === '/chat') {
    ctx.body = await readFile('index.html', 'utf-8')
  } else if (ctx.URL.pathname === '/main.js') {
    ctx.body = await readFile('main.js', 'utf-8')
  }
})

const port = process.env.PORT || 3000
server.listen(port, () => console.log('listening on port:', port))
