const _ = require('lodash')

function userRoutes ({
  userService
}) {
  async function createUser (_request, _reply) {
    await userService.createUser(_request.body)

    return {
      result: 'User Created'
    }
  }

  async function getUsers (_request, _reply) {
    return await userService.getUsers()
  }

  async function getUserById (_request, _reply) {
    const { id } = _request.params
    const result = await userService.getUserById(id)

    if (_.isEmpty(result)) {
      return {
        result: 'User does not exist.'
      }
    }

    const [user] = result

    return user
  }

  return {
    createUser,
    getUserById,
    getUsers
  }
}

module.exports = userRoutes
