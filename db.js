const postgres = require('postgres')

const sql = postgres(process.env.POSTGRESQL_CONN_STRING)

module.exports = sql