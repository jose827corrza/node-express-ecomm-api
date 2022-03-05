const express = require('express');
const router = express.Router();
const UsersService = require('../services/usersService');

const serviceUsers = new UsersService();
//Getting users
router.get('/', (req, res) => {

  const users = serviceUsers.find();
  res.json(users);
});

//Getting user
router.get('/:userId', async(req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await serviceUsers.findOne(userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

//Create user
router.post('/', async (req, res) => {
  const newUserData = req.body;
  const newUser = await serviceUsers.createOne(newUserData);
  res.status(201).json(newUser);
})

//Update user
router.patch('/:userId', async (req, res) => {
  const { userId } = req.params;
  const body = req.body;
  const updatedUser = await serviceUsers.updateOne(userId, body);
  res.status(201).json(updatedUser);

});

//Delete user
router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
  const deletedUser = await serviceUsers.deleteOne(userId);
  res.json({
    message: 'Deleted',
    userDeleted: deletedUser
  })
})

module.exports = router;
