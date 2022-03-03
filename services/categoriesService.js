const faker = require('faker');

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

    find() {
        return this.category;
    }

    findOne(id) {
        return this.category.find(item => item.id === id);
    }

    updateOne(id) {

    }

    deleteOne(id) {
        const index = this.category.findIndex(item => item.id === id);
        if(index === -1) {
            throw new Error('Product not found');
        }
        this.category.splice(index, 1);
    }
}

module.exports = CategoryService;