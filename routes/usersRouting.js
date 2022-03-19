const express = require('express');
const router = express.Router();
const UsersService = require('../services/usersService');
const ValidatorHandler = require('../middlewares/validator');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('../schemas/userSchema');

const serviceUsers = new UsersService();
//Getting users
router.get('/', async (req, res) => {
  const users = await serviceUsers.find();
  res.json(users);
});

//Getting user
router.get(
  '/:id',
  ValidatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const user = await serviceUsers.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

//Create user
router.post(
  '/',
  ValidatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const newUserData = req.body;
      const newUser = await serviceUsers.createOne(newUserData);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

//Update user
router.patch(
  '/:id',
  ValidatorHandler(getUserSchema, 'params'),
  ValidatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedUser = await serviceUsers.updateOne(id, body);
      res.status(201).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

//Delete user
router.delete('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const deletedUser = await serviceUsers.deleteOne(userId);
    res.json({
      message: 'Deleted',
      userDeleted: deletedUser,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
