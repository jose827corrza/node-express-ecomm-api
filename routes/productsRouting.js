const express = require('express');
const router = express.Router();
const ProductsService = require('../services/productsService');

const serviceProducts = new ProductsService();


//Getting products
router.get('/', (req, res) =>{
  const products = serviceProducts.find();
  res.json(products);
});

//Get filter
router.get('/filter', (req, res) =>{
  res.send('Soy un filter');
});

//Getting product
router.get('/:id', (req, res) =>{
  const { id } = req.params;
  const product = serviceProducts.findOne(id);
  res.json(product);
});

//Create product
router.post('/', (req, res) =>{
  const body = req.body;
  const newProduct = serviceProducts.createOne(body);
  res.status(201).json(newProduct);
})

//Update product
router.patch('/:productId', (req, res) => {
  const {productId} = req.params
  const body = req.body;
  const updatedProduct = serviceProducts.updateOne(productId, body);

  res.status(201).json(updatedProduct);
})

module.exports = router;
