const joi = require('joi');

const id = joi.number().integer();
const email = joi.string().min(3).max(30);
const password = joi.string().min(6).max(15);
const role = joi.string().min(3);

const createUserSchema = joi.object({
    email: email.required(),
    password: password.required(),
    role: role.required()
});

const updateUserSchema = joi.object({
    email: email,
    password: password,
    role: role,
});

const getUserSchema = joi.object({
    id: id.required()
});

module.exports = {createUserSchema, updateUserSchema, getUserSchema};
