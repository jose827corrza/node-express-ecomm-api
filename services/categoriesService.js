const faker = require('faker');
const boom = require('@hapi/boom');


class CategoryService {

    constructor() {
        this.category = [];
        this.generate();
    }

    generate() {
        const limit = 100;
        for (let index = 0; index < limit; index++) {
            this.category.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl(),

            });
        }
    }
    createOne(data){
      const newCategory = {
        id: faker.datatype.uuid(),
        ... data
      }
      this.category.push(newCategory);
      return newCategory;
    }


    find() {
        return this.category;
    }

    async findOne(id) {
        const category = this.category.find(item => item.id === id);
        if(!category){
          throw boom.notFound('no esxiste la categoria');
        }
        return category;
    }

    async updateOne(id, changes) {
      const index = this.category.findIndex(item => item.id === id);
        if(index === -1) {
            throw boom.notFound('Product not found');
        }
      const updateCategory = this.category[index];
      this.category[index] = {
        ... updateCategory,
        ... changes
      }
      return this.category[index];
    }

    async deleteOne(id) {
        const index = this.category.findIndex(item => item.id === id);
        if(index === -1) {
            throw boom.notFound('Product not found');
        }
        const deletedCategory = this.category[index].id;
        this.category.splice(index, 1);
        return deletedCategory;
    }
}

module.exports = CategoryService;
