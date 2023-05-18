const { POSTGRES: { SCHEMA } } = require('../src/config')
const KnexExtensions = require('../src/db/knex-extensions')

exports.up = async function (knex) {
  console.debug(SCHEMA)
  const knexHelper = new KnexExtensions(knex)

  await knexHelper.createTable('roles', function roles(table){
    table.increments('id')
    table.string('role', 50).notNullable()
  }, SCHEMA)

  await knexHelper.createTable('users', function users(table) {
    table.increments('id')
    table.string('first_name', 50).notNullable()
    table.string('last_name', 50).notNullable()
    table.integer('role_id')
      .references('id')
      .inTable(this.getTableReferenceWithSchema('roles', SCHEMA))
      .notNullable()
    table.timestamps(true, true)
  }, SCHEMA)

  await knexHelper.createTable('stores', function stores(table) {
    table.increments('id')
    table.string('store_name', 255).notNullable()
    table.string('store_description')
    table.integer('user_id')
      .references('id')
      .inTable(this.getTableReferenceWithSchema('users', SCHEMA))
      .notNullable()
    table.timestamps(true, true)
  }, SCHEMA)

  await knexHelper.createTable('products', function products(table) {
    table.increments('id')
    table.string('product_name', 100).notNullable()
    table.string('product_description', 255).notNullable()
    table.integer('stock').notNullable()
    table.integer('store_id')
      .references('id')
      .inTable(this.getTableReferenceWithSchema('stores', SCHEMA))
      .notNullable()
    table.timestamps(true, true)
  }, SCHEMA)
}

exports.down = async function (knex) {
  await knex.schema.withSchema(SCHEMA).dropTable('products')
  await knex.schema.withSchema(SCHEMA).dropTable('stores')
  await knex.schema.withSchema(SCHEMA).dropTable('users')
  await knex.schema.withSchema(SCHEMA).dropTable('roles')
}
