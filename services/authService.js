const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {config} = require('../config/config');
const nodemailer = require("nodemailer");
const UsersService = require('./usersService');

const service = new UsersService();
class AuthService{

  async getUser(email, password){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }
    const  isMatch = bcrypt.compare(password, user.password);
    if(!isMatch){
      throw boom.unauthorized();
    }
    return user;
  };

  signToken(user){

    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return{
      user,
      token
    };
  }

  async recoveryRecovery(email){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized('hi');
    }
    const payload = { sub: user.id};
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `https://myFront.com/recovery?token=${token}`;
    await service.updateOne(user.id, {recoveryToken: token});

    const mail = {
      from: config.emailSecret, // sender address
      to: email, // list of receivers
      subject: "Recovery your password", // Subject line
      html: `<b>Follow this link to recovery your password => ${link}</b>`, // html body
    };
    console.log(mail.to)
    const rta = await this.sendEmail(mail);
    return rta;
  }

  async sendEmail(infoMail){
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.emailSecret, // generated ethereal user
        pass: config.psswdSecret, // generated ethereal password
      },
    });
    await transporter.sendMail(infoMail);
    return {message: 'mail sent'};
  }

}

module.exports = AuthService;
