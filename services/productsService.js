const {models} = require('../libs/sequelize')
const boom = require('@hapi/boom');
const { Op } = require('sequelize');
class ProductsService {

    constructor() {
        this.products = [];

    }

    // generate() {

    //     const limit = 100;
    //     for (let index = 0; index < limit; index++) {
    //         this.products.push({
    //             id: faker.datatype.uuid(),
    //             name: faker.commerce.productName(),
    //             description: faker.commerce.productDescription(),
    //             price: parseInt(faker.commerce.price(), 10),
    //             discount: parseInt(Math.random(), 10),
    //             image: faker.image.imageUrl(),
    //             createdAt: Date.now()
    //         });
    //     }
    // }

    async makeData(){
      for(let i = 0; i < this.products.length; i++){
        await models.Product.create(this.products[i]);
      }

    }

    async createOne(data){
      const newUser = await models.Product.create(data);
      return newUser;
    }

    async find(query){
      const options = {
        include: ['category'],
        where: {}
        // limit: 2,
        // offset: 0
      }
      // options.limit = limit;
      // options.offset = offset;
      const {limit, offset, price, price_min, price_max} = query;
      if(limit && offset){
        options.limit = parseInt(limit);
        options.offset = parseInt(offset);
      }
      if(price){
        options.where.price = price;
      }
      if(price_min && price_max){
        options.where.price = {
          [Op.gte]: price_min,
          [Op.lte]: price_max
        }
      }
        return models.Product.findAll(options);
    }

    async findOne(id){
        const product = await models.Product.findByPk(id);
        if(!product){
          throw boom.notFound('No existe el producto');
        }
        return product;
    }

    async updateOne(id, changes){
      const product = await this.findOne(id);
      const rta = await product.update(changes);
      return rta;
    }

    async deleteOne(id){
      const product = await this.findOne(id);
      product.destroy();
      return { id};
    }



}

module.exports = ProductsService;
