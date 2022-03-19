'use strict';
const {CATEGORY_TABLE, CategorySchema} = require('../models/categoryModel');
const {PRODUCT_TABLE, ProductSchema} = require('../models/productModel');
module.exports = {
  async up (queryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  },

  async down (queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.dropTable(PRODUCT_TABLE, ProductSchema);
  }
};
