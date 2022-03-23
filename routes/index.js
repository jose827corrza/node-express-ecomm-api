const productsRouter = require('./productsRouting');
const categoryRouter = require('./categoryRouting');
const usersRouter = require('./usersRouting');
const customersRouter = require('./customerRouting');
const ordersRouter = require('./orderRouting');
const authRouter = require('./authRouting');
const express = require('express');



function routerApi(app){
  const router = express.Router();
  app.use('/node/v1', router)
  router.use('/products', productsRouter);
  router.use('/category', categoryRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', ordersRouter);
  router.use('/auth', authRouter);
  //Y asi se haria el proceso si fuera versionamiento de endpoints
  //app.use('/joseDev/v2', router)
}

module.exports = routerApi;
