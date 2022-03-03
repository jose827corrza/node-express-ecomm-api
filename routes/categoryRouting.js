const express = require('express');
const router = express.Router();
const CategoriesService = require('../services/categoriesService');

const serviceCategory = new CategoriesService();

router.get('/', (req, res) =>{
  
  const category = serviceCategory.find();
  res.json(category);
});

router.get('/:id', (req, res) =>{
  const {id} = req.params;
  const category = serviceCategory.findOne(id);
  res.json(category);
});

router.post('/', (req, res) =>{
  
  const category = serviceCategory.find();
  res.json(category);
});

router.patch('/:id', (req, res) =>{
  const {id} = req.params;
  const category = serviceCategory.updateOne(id);
  res.json(category);
});

router.delete('/:id', (req, res) =>{
  const {id} = req.params;
  const category = serviceCategory.deleteOne(id);
  res.json(category);
});



module.exports = router;
