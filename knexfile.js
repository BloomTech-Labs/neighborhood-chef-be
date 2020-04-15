module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/neighborhood-chef.dev.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'neighborhood-chef.stg',
      user:     'LambdaLabsPT9NeighborhoodChef',
      password: 'p2$5aBk#0GLLV956',
    },
    pool: {
      min: 1,
      max: 4,
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'neighborhood-chef.prd',
      user:     'LambdaLabsPT9NeighborhoodChef',
      password: 'p2$5aBk#0GLLV956',
    },
    pool: {
      min: 2,
      max: 8,
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations',
    },
  },

};
