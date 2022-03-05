const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(3).max(15);
const lastname = joi.string().min(3).max(15);
const image = joi.string().uri();

const createUserSchema = joi.object({
    name: name,
    lastname: lastname,
    image: image,

});

const updateUserSchema = joi.object({
    name,
    lastname,
    image
});

const getUserSchema = joi.object({
    id: id.required()
});

module.exports = {createUserSchema, updateUserSchema, getUserSchema};