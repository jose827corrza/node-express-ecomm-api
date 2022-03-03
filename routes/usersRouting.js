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
router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  const user = serviceUsers.findOne(userId);
  res.json(user);
});

//Create user
router.post('/', (req, res) => {
  const newUserData = req.body;
  const newUser = serviceUsers.createOne(newUserData);
  res.status(201).json(newUser);
})

//Update user
router.patch('/:userId', (req, res) => {
  const {userId} = req.params;
  const body = req.body;
  const updatedUser = serviceUsers.updateOne(userId, body);
  res.status(201).json(updatedUser);

});

//Delete user
router.delete('/:userId', (req, res) => {
  const {userId} = req.params;
  const deletedUser = serviceUsers.deleteOne(userId);
  res.json({
    message: 'Deleted',
    userDeleted: deletedUser
  })
})

module.exports = router;
