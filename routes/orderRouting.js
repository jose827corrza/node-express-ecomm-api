const express = require('express');
const router = express.Router();
const OrderService = require('../services/ordersService');
const ValidatorHandler = require('../middlewares/validator');
const passport = require('passport');
const {
  createOrderSchema,
  getOrderSchema,
  addProductToOrderSchema
} = require('../schemas/orderSchema');

const serviceOrders = new OrderService();

// router.get('/', async (req, res, next) =>{
//   try {
//     const rta = await serviceOrders.find();
//     return rta;
//   } catch (error) {
//     next(error);
//   }
// })

router.post(
  '/',
  ValidatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await serviceOrders.createOne(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add_item',
  passport.authenticate('jwt', { session: false }),
  ValidatorHandler(addProductToOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProductToItem = await serviceOrders.addItem(body);
      res.status(201).json(newProductToItem);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  ValidatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await serviceOrders.findOne(id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }
);



module.exports = router;
