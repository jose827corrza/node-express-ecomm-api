require('dotenv').config();

const config = {
  env : process.env.NODE_ENV || 'dev',
  isProd : process.env.NODE_ENV === 'production',
  port : process.env.PORT || 3000,
  dbUser : process.env.DB_USER,
  dbPassword : process.env.DB_PASSWORD,
  dbHost : process.env.DB_HOST,
  dbName : process.env.DB_NAME,
  dbPort : process.env.DB_PORT,
  dbUrl : process.env.DATABASE_URL,
  jwtSecret : process.env.JWT_SECRET,
  emailSecret : process.env.EMAIL_USED,
  psswdSecret : process.env.PSSWD_USED
};

module.exports = { config};
