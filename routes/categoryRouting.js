const express = require('express');
const router = express.Router();
const CategoriesService = require('../services/categoriesService');
const ValidatorHandler = require('../middlewares/validator');
const checkForRoles = require('../middlewares/authHandler');
const passport = require('passport');
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('../schemas/categorySchema');

const serviceCategory = new CategoriesService();

//Getting categories
router.get('/', async (req, res) => {
  const category = await serviceCategory.find();
  res.status(200).json(category);
});

//Getting category
router.get(
  '/:id',
  ValidatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await serviceCategory.findOne(id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

//Creating category
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkForRoles('Administrator'),
  ValidatorHandler(createCategorySchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const category = await serviceCategory.createOne(body);
    res.status(201).json(category);
  }
);

//Updating category
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkForRoles('Administrator'),
  ValidatorHandler(getCategorySchema, 'params'),
  ValidatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await serviceCategory.updateOne(id, body);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }
);

//Deleting category
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkForRoles('Administrator'),
  async (req, res) => {
    const { id } = req.params;
    const category = await serviceCategory.deleteOne(id);
    res.status(201).json(category);
  });

module.exports = router;
