const { Sequelize} = require('sequelize');
const {config} = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'mysql',
  logging: true,
});

setupModels(sequelize);

/**
 * Aca va a leer los modelos y va a crear la struc,
 * resumen, con el sync crea las tablas en base a los modelos y schemas que se desarrollan en models
 */
//sequelize.sync();
//El sync no es recomentadable para PRD, por tanto se hace uso de migraciones

module.exports = sequelize;
