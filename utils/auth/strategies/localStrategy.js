const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const AuthService = require('./../../../services/authService');
const service = new AuthService();

const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
},
async (email, password, done) =>{
  try {
    const user = await service.findByEmail(email);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}
);

module.exports = LocalStrategy;
