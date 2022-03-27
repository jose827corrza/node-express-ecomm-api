const boom = require('@hapi/boom');

const {models} = require('../libs/sequelize');

class UsersService {
  constructor() {}

  async createOne(data){
    const newUser = await models.User.create(data);
    //Deletes the field password before returning to prevent of showing the password
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const options = {
      attributes: {
        exclude: ['password', 'recoveryToken']
      }
    };
    const rta = await models.User.findAll(options);
    return rta;
  }

  async findByEmail(email) {
    const options = {
      attributes: {
        exclude: ['password', 'recoveryToken']
      },
      where: {email}
    };
    const user = await models.User.findOne(
       {
       where: {email}
     },
     options
    

    );
    return user;
  }

  async findOne(id) {
    const options = {
      attributes: {
        exclude: ['password', 'recoveryToken']
      }
    };
    const user = await models.User.findByPk(id, options);
    if(!user){
      throw boom.notFound('Creo no existe el usuario');
    }
    return user;
  }

  async updateOne(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async deleteOne(id) {
    const user = await this.findOne(id);
    user.destroy();
    return {id};
  }
}

module.exports = UsersService;
