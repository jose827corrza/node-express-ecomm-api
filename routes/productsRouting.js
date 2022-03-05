const express = require('express');
const router = express.Router();
const ProductsService = require('../services/productsService');
const ValidatorHandler = require('../middlewares/validator');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/productSchema');

const serviceProducts = new ProductsService();


//Getting products
router.get('/', async (req, res) => {
  const products = serviceProducts.find();
  res.json(products);
});

//Get filter
router.get('/filter', (req, res) => {
  res.send('Soy un filter');
});

//Getting product
router.get('/:id', ValidatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await serviceProducts.findOne(id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  });

//Create product
router.post('/', ValidatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await serviceProducts.createOne(body);
    res.status(201).json(newProduct);
  })

//Update product
router.patch('/:productId', ValidatorHandler(updateProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { productId } = req.params
      const body = req.body;
      const updatedProduct = await serviceProducts.updateOne(productId, body);

      res.status(201).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  })

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedProduct = serviceProducts.deleteOne(id);
  res.json(deletedProduct);

})

module.exports = router;
