const express = require('express');
const router = express.Router();
const ProductsService = require('../services/productsService');
const ValidatorHandler = require('../middlewares/validator');
const checkForRoles = require('../middlewares/authHandler');
const passport = require('passport');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  gettingProductAllSchema,
} = require('../schemas/productSchema');

const serviceProducts = new ProductsService();

//Getting products
router.get(
  '/',
  ValidatorHandler(gettingProductAllSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await serviceProducts.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

//Get filter
router.get('/filter', (req, res) => {
  res.send('Soy un filter');
});

//Getting product
router.get(
  '/:id',
  ValidatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await serviceProducts.findOne(id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }
);

//Create product
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkForRoles('Administrator'),
  ValidatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await serviceProducts.createOne(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

//Create a data of products
router.post('/create_db', async (req, res) => {
  const createdDB = await serviceProducts.makeData();
  res.status(201).json({ message: 'DB created', db: createdDB });
});

//Update product
router.patch(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  checkForRoles('Administrator'),
  ValidatorHandler(updateProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { productId } = req.params;
      const body = req.body;
      const updatedProduct = await serviceProducts.updateOne(productId, body);

      res.status(201).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkForRoles('Administrator'),
  async (req, res) => {
    const { id } = req.params;
    const deletedProduct = serviceProducts.deleteOne(id);
    res.json(deletedProduct);
  });

module.exports = router;
