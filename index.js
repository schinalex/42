const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  await next()
})

app.use(ctx => {
  ctx.body = 'Hello World'
})

app.listen(3000)
