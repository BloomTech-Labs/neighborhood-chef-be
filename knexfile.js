require('dotenv-safe').config({
  allowEmptyValues: true
});

module.exports = {
  testing: {
    client: 'pg',
    connection: process.env.POSTGRES_CONNECTION_STRING,
    pool: {
      min: 0,
      max: 2,
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  development: {
    client: 'pg',
    connection: process.env.POSTGRES_CONNECTION_STRING,
    pool: {
      min: 0,
      max: 2,
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  staging: {
    client: 'pg',
    connection: process.env.POSTGRES_CONNECTION_STRING,
    pool: {
      min: 1,
      max: 4,
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.POSTGRES_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 8,
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations',
    },
    // seeds: { directory: './data/seeds' },
  },
};
