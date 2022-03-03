const express = require('express');
const router = express.Router();
const CategoriesService = require('../services/categoriesService');

const serviceCategory = new CategoriesService();

router.get('/', (req, res) =>{

  const category = serviceCategory.find();
  res.status(200).json(category);
});

router.get('/:id', (req, res) =>{
  const {id} = req.params;
  const category = serviceCategory.findOne(id);
  res.status(200).json(category);
});

router.post('/', (req, res) =>{
  const body = req.body;
  const category = serviceCategory.createOne(body);
  res.status(201).json(category);
});

router.patch('/:id', (req, res) =>{
  const {id} = req.params;
  const body = req.body;
  const category = serviceCategory.updateOne(id, body);
  res.status(201).json(category);
});

router.delete('/:id', (req, res) =>{
  const {id} = req.params;
  const category = serviceCategory.deleteOne(id);
  res.status(201).json(category);
});



module.exports = router;
