const { POSTGRES } = require('../config')

class UserService {
  constructor (dbService) {
    this.dbService = dbService

    this.roles = {
      admin: 1,
      user: 2,
      client: 3
    }
  }

  async createUser ({
    firstName,
    lastName,
    role
  }) {
    const sql = `insert into ${POSTGRES.SCHEMA}.users (first_name, last_name, role_id) values ($1, $2, $3)`
    return await this.dbService.doQuery(sql, [firstName, lastName, this.roles[role]])
  }

  async getUsers () {
    const sql = `select * from ${POSTGRES.SCHEMA}.users`
    const result = await this.dbService.doQuery(sql)

    return result
  }

  async getUserById (id) {
    const sql = `select first_name, last_name from ${POSTGRES.SCHEMA}.users where id=($1)`
    const result = await this.dbService.doQuery(sql, [id])
    console.log(result)

    return result
  }
}

module.exports = UserService
