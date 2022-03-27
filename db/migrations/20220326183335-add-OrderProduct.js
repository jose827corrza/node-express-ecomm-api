const {ORDER_PRODUCT_TABLE} =require('../models/orde-productModel');
const {PRODUCT_TABLE} =require('../models/productModel');
const {ORDER_TABLE} =require('../models/orderModel');
const {DataTypes} = require('sequelize');
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, 
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        productId: {
          field: 'product_id',
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: PRODUCT_TABLE,
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        orderId: {
          field: 'order_id',
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: ORDER_TABLE,
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        createdAt: {
          field: 'created_at',
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: false
        },
        ammount: {
          allowNull: false,
          type: DataTypes.INTEGER
        }
      
      }
      )
  },

  async down (queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};
