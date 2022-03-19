const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(15);
const price = joi.number().integer().min(10);
const img = joi.string().uri();

const createCategorySchema = joi.object({
    name : name.required(),
    image: img.required()
});

const updateCategorySchema = joi.object({
    name: name,
    image: img.required()
});

const getCategorySchema = joi.object({
    id: id.required()
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema};
