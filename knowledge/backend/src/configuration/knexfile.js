module.exports = {
  debug: process.env.NODE_ENV === 'development',
  client: process.env.SQL_DATABASE_CLIENT,
  connection: process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  } : {
    host: process.env.SQL_DATABASE_HOST,
    database: process.env.SQL_DATABASE_NAME,
    user: process.env.SQL_DATABASE_USER,
    password: process.env.SQL_DATABASE_PASSWORD,
    ssl: { rejectUnauthorized: false },
  },
  migrations: {
    tableName: process.env.SQL_DATABASE_TABLE_MIGRATIONS,
    directory: '../../migrations'
  },
  seeds: {
    directory: '../../seeds'
  }
}