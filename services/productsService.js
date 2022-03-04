const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {

    constructor() {
        this.products = [];
        this.generate();
    }

    generate() {

        const limit = 100;
        for (let index = 0; index < limit; index++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl(),
                isBlock: faker.datatype.boolean()
            });
        }
    }
    async createOne(data){
      const newProduct = {
        id: faker.datatype.uuid(),
        ... data
      }
      this.products.push(newProduct);
      return newProduct;
    }
    find(){
        return this.products;
    }

    async findOne(id){
        const product = this.products.find(item => item.id === id);
        if(!product){
          throw boom.notFound('Creo no existe lo que buscas :C');
        }
        if(product.isBlock){
          throw boom.conflict('No esta disponible');
        }
        return product;
    }

    async updateOne(id, changes){
      const index = this.products.findIndex(item => item.id === id);
      if(index == -1){
        throw boom.notFound('producto a actualizar no encontrado :C');
      }
      const product = this.products[index];
      this.products[index] = {
        ... product,
        ... changes
      }
      return this.products[index];
    }

    async deleteOne(id){
      const index = this.products.findIndex(item => item.id === id);
      if(index === -1){
        throw boom.notFound('Product not found :C');
      }
      this.products.splice(index, 1);
      return { id };
    }



}

module.exports = ProductsService;
