const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  async createOne(data) {
    const newUser = await models.User.create(data.user);
const newCustomer = await models.Customer.create({

  ...data,
  userId: newUser.id
});

return newCustomer;
  }
  async find() {
    const options = {
      attributes: {
        exclude: ['password', 'recoveryToken'],
        
      },
      include: ['user'],
    };
    const rta = await models.Customer.findAll(
      
      options
    );
    return rta;
  }
  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('No se encuentra el customer :c');
    }
    return customer;
  }
  async updateOne(id, changes) {
    const customer = this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }
  async deleteOne(id) {
    const customer = this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
