'use strict';
const { hash } = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email is required."
        },
        notNull: {
          msg: "Email is required."
        },
        isEmail: {
          msg: "Email format is invalid."
        }
      },
      unique: {
        msg: "Email already exists."
      }
    },
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required."
        },
        notNull: {
          msg: "Password is required."
        },
        len: {
          args: [8],
          msg: "Password must contain at least 8 characters."
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user, _) => {
    user.password = hash(user.password)
  })

  return User;
};