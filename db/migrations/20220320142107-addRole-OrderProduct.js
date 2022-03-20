'use strict';

const {ORDER_PRODUCT_TABLE, OrderProductSchema} = require('../models/orde-productModel');
const {USER_TABLE, UserSchema} = require('../models/userModel');

module.exports = {
  async up (queryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
     await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  },

  async down (queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn(USER_TABLE, 'role');
     await queryInterface.dropTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  }
};
