const faker = require('faker');
const boom = require('@hapi/boom');
class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  find() {
    return this.users;
  }

  async findOne(id) {
    const user = this.users.find((item) => item.id === id);
    if(!user){
      throw boom.badRequest('Parece ser que no existe :c');
    }
    if(user.isBlock) {
      throw boom.forbidden('No puedes ver a este usuario');
    }
    return user;
  }

  async updateOne(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.badRequest('Product not found');
    }
    const updateUser = this.users[index];
    // se hace de esta manera por que patch envia solo lo que se cambio
    // y lo de abajo automaticamente sabe que cambio es el que tiene que cambiar
    this.users[index] = {
      ...updateUser,
      ...changes,
    };
    return this.users[index];
  }

  async deleteOne(id) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.users.splice(index, 1);
  }

  async createOne(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }
}

module.exports = UsersService;
