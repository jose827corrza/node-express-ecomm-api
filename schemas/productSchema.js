const joi = require('joi');

const id = joi.number().integer();
const limit = joi.number().integer();
const offset = joi.number().integer();
const name = joi.string().min(3).max(15);
const price = joi.number().integer().min(10);
const price_min = joi.number().integer();
const price_max = joi.number().integer();
const img = joi.string().uri();
const description = joi.string().min(10);
const categoryId = joi.number().integer();

const createProductSchema = joi.object({
    name : name.required(),
    description: description.required(),
    price : price.required(),
    image : img.required(),
    categoryId: categoryId.required()
});

const updateProductSchema = joi.object({
    name: name,
    description: description,
    image: img,
    categoryId: categoryId
});

const getProductSchema = joi.object({
    id: id.required()
});

const gettingProductAllSchema = joi.object({
  limit: limit,
  offset: offset,
  price: price,
  price_min: price_min,
  price_max: price_max.when('price_min', {
    is: joi.number().integer().required(),
    then: joi.required()
  })
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema, gettingProductAllSchema};
