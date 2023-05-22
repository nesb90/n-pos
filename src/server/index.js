const { SERVER, POSTGRES } = require('../config')
const fastify = require('fastify')({ logger: { level: 'debug' } })

// init DBPool
const DBPool = require('../db/db.pool')
const dbPool = new DBPool(POSTGRES.CONFIG, 10)

// import services
const DBService = require('../services/db.service')
const UserService = require('../services/user.service')

// initialize services
const dbService = new DBService(dbPool)
const userService= new UserService(dbService)

// import routes
const userRoutes = require('./routes/users.route')({ userService })

// setting routes
// // health routes
fastify.get('/health', require('./routes/health.route'))

// // user routes
fastify.post('/user', userRoutes.createUser)
fastify.get('/users', userRoutes.getUsers)
fastify.get('/user/:id', userRoutes.getUserById)

async function start () {
  try {
    await fastify.listen({ port: SERVER.port, host: SERVER.host })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
