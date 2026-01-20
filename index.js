const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  await next()
})

app.use(ctx => {
  if (ctx.method !== 'GET') {
    ctx.status = 405
    ctx.body = 'Method Not Allowed'
    return
  }

  if (ctx.path === '/') {
    ctx.body = 'Hello World'
    return
  }

  if (ctx.path === '/hello') {
    ctx.body = 'Hello from /hello'
    return
  }

  if (ctx.path === '/time') {
    ctx.body = new Date().toISOString()
    return
  }

  if (ctx.path === '/json') {
    ctx.type = 'application/json'
    ctx.body = { ok: true, path: ctx.path }
    return
  }

  ctx.status = 404
  ctx.body = `Not Found: ${ctx.path}`
})

app.listen(3000)
