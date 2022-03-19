const faker = require('faker');
const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class CategoryService {
  constructor() {
    this.category = [];
  }



  async createOne(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    if (!category) {
      throw boom.notFound('Esta categoria no existe');
    }
    return category;
  }

  async updateOne(id, changes) {
    const category = await this.findOne(id);
    const rta = await category.update(changes);
    return rta;

  }

  async deleteOne(id) {
    const category = await this.findOne(id);
    category.destroy();
    return { id };

  }
}

module.exports = CategoryService;
