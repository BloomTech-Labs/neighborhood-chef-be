const knex = require("knex");
const config = require("../knexfile.js");
const environment = "development";
module.exports = knex(config[environment]);
