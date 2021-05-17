const knex = require('knex'); // Connects Server and Database

const { isProductionEnv } = require('./utils');

const DEV_DB_CONNECTION = {
  host: '127.0.0.1',
  user: '', // local db user name
  password: '', // local db password
  database: '', // local dabatase name
};

const PROD_DB_CONNECTION = {
  connectionString: process.env.DATABASE_URL,
  ssl: true,
};

const database = knex({
  client: 'pg',
  connection: isProductionEnv ? PROD_DB_CONNECTION : DEV_DB_CONNECTION,
});

module.exports = {
  database,
};
