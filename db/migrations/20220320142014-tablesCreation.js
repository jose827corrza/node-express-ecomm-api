'use strict';
const {DataTypes, Sequelize} = require('sequelize');

const {USER_TABLE} = require('../models/userModel');
const {PRODUCT_TABLE, ProductSchema} = require('../models/productModel');
const {CATEGORY_TABLE, CategorySchema} = require('../models/categoryModel');
const {CUSTOMER_TABLE, CustomerSchema} = require('../models/customerModel');
const {ORDER_TABLE, OrderSchema} = require('../models/orderModel');
module.exports = {
  async up (queryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      email:{
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password:{
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt:{
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW

      }
    });
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
  },

  async down (queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('categories');
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('customers');
    await queryInterface.dropTable('orders');
  }
};
