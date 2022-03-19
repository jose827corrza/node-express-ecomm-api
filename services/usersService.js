const boom = require('@hapi/boom');

const {models} = require('../libs/sequelize');

class UsersService {
  constructor() {}

  async createOne(data){
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll();
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
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
