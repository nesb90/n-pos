const { SERVER } = require('../config')
const fastify = require('fastify')({ logger: { level: 'debug' } })

fastify.get('/health', async function health (_request, _reply) {
  return { status: 'ok' }
})

async function start () {
  try {
    await fastify.listen({ port: SERVER.port, host: SERVER.host })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
