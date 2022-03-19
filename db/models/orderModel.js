const { Model, DataTypes, Sequelize} = require('sequelize');
const {CUSTOMER_TABLE} = require('../models/customerModel');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: CUSTOMER_TABLE,
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
  total: {
    type: DataTypes.VIRTUAL,
    get(){
      if(this.items.length > 0){
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.ammount);
        }, 0);
      }
      return 0;
    }
  }

};

class Order extends Model {
  static associate(models){
    this.belongsTo(models.Customer, {
      as: 'customer'
    })
    this.belongsToMany(models.OrderProduct, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId'
    });
    //models
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
};

module.exports = { ORDER_TABLE, OrderSchema, Order};
