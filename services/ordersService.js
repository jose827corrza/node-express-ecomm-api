const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class OrderService {

constructor(){}

  async find(){
    return [];
  }
  async createOne(data){
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data){
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }
  async findOne(id){
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items'
      ]
    });
    if(!order){
      throw boom.notFound('No existe la orden');
    }
    return order;
}
}

module.exports = OrderService;
