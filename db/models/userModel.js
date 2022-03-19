const { Model, DataTypes, Sequelize} = require('sequelize');


const USER_TABLE = 'users';

/**
 * Este shcema define la estructura de la base de datos,
 * diferente a los schemas que valdian la informacion (joi).
 *
 * Esto es por que la ORM es agnostica, entonces para las migraciones nos va a facilitar la existencia
 */
const UserSchema = {
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
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW

  }
};

/**
 * Esto es super importante..
 * gracias a la extencion se obtienen metodos de find() so on..
 *
 * que sean 'static' significa que yo  no necesito una declaracion para acceder a esos metodos
 */
class User extends Model {
  static associate(){
    //models
    // this.hasOne(models.Customer, {
    //   as: 'customer',
    //   foreignKey: 'userId'
    // });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
};

module.exports = { USER_TABLE, UserSchema, User};
