const express = require('express');
const router = express.Router();
const CustomerService = require('../services/customerService');
const ValidatorHandler = require('../middlewares/validator');
const {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
} = require('../schemas/customerSchema');

const serviceCustomer = new CustomerService();
//Getting customers
router.get('/', async (req, res) => {
  const customers = await serviceCustomer.find();
  res.json(customers);
});

//Getting customer
router.get(
  '/:id',
  ValidatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const customer = await serviceCustomer.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

//Create user
router.post(
  '/',
  ValidatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const newCustomerData = req.body;
      const newCustomer = await serviceCustomer.createOne(newCustomerData);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);

//Update customer
router.patch(
  '/:id',
  ValidatorHandler(getCustomerSchema, 'params'),
  ValidatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedCustomer = await serviceCustomer.updateOne(id, body);
      res.status(201).json(updatedCustomer);
    } catch (error) {
      next(error);
    }
  }
);

//Delete customer
router.delete('/:customerId', async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const deletedCustomer = await serviceCustomer.deleteOne(customerId);
    res.json({
      message: 'Deleted',
      userDeleted: deletedCustomer,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
