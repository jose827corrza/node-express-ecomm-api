const { Client } = require('pg');

/**
 *
 * @returns Esta es la version menos optima,
 * por que cada vez que se llame crearia una instacia,
 *  la mejor forma es usar un pool
 */
async function getConnection() {
  const client = new Client();
  const options = {
    host: 'localhost',
    port: 5432,
    user: 'nico',
    password: 'admin123',
    database: 'my_store',
  };
  await client.connect(options);
  return client;
}

module.exports = getConnection;
