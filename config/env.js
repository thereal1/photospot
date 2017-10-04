const env = {
  PORT: process.env.PORT || 8000,
  DATABASE_URL: process.env.DATABASE_URL || 'testdbs.cx9nwtqithkq.eu-west-2.rds.amazonaws.com',
  DATABASE_NAME: process.env.DATABASE_NAME || 'photospot',
  DATABASE_HOST: process.env.DATABASE_HOST || 'testdbs.cx9nwtqithkq.eu-west-2.rds.amazonaws.com',
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'test_user',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'password1235',
  DATABASE_PORT: process.env.DATABASE_PORT || 5432,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'postgres',

  NODE_ENV: process.env.NODE_ENV || 'development',
}

module.exports = env
