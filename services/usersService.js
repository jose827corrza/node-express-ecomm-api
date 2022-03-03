const faker = require('faker');

class UsersService {

    constructor() {
        this.users = [];
        this.generate();
    }

    generate() {
        
        const limit =  100;
        for (let index = 0; index < limit; index++) {
            this.users.push({
                id: faker.datatype.uuid(),
                name: faker.name.firstName(),
                lastname: faker.name.lastName(),
                image: faker.image.imageUrl(),
            });
        }
    }

    find(){
        return this.users;
    }

    findOne(id) {
        return this.users.find(item => item.id === id);
    }

    updateOne() {

    }

    deleteOne(id) {
        const index = this.users.findIndex(item => item.id === id);
        if(index === -1) {
            throw new Error('Product not found');
        }
        this.users.splice(index, 1);
    }

}

module.exports = UsersService;