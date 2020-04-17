module.exports = {

  development: {
    client: 'pg',
    // connection: {
    //   host:     'localhost',
    //   port:     5432,
    //   user:     'neighborhoodchef',
    //   password: 'J4mb4l4y4!',
    //   database: 'neighborhoodchef_dev',
    // },
    connection: 'postgres://neighborhoodchef:J4mb4l4y4!@localhost:5432/neighborhoodchef_dev',
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
    seeds: { directory: './data/seeds' },
  },

};
