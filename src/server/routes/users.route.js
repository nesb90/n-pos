const _ = require('lodash')

function userRoutes ({
  userService
}) {
  async function createUser (_request, _reply) {
    await userService.createUser(_request.body)

    return _reply.send({
      result: 'User Created'
    })
  }

  async function getUsers (_request, _reply) {
    const users = await userService.getUsers()
    return _reply.send(users)
  }

  async function getUserById (_request, _reply) {
    const { id } = _request.params
    const result = await userService.getUserById(id)

    if (_.isEmpty(result)) {
      return _reply.send({
        result: 'User does not exist.'
      })
    }

    return _reply.send(...result)
  }

  return {
    createUser,
    getUserById,
    getUsers
  }
}

module.exports = userRoutes
