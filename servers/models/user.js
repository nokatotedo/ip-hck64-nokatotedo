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
      User.hasOne(models.UserProfile, {
        as: 'profiles',
        foreignKey: 'userId'
      })
      User.hasMany(models.Kost, {
        as: 'owner',
        foreignKey: 'ownerId'
      })
      User.hasMany(models.Transaction, {
        as: 'transactions',
        foreignKey: 'clientId'
      })
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
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "client"
    }
  }, {
    hooks: {
       beforeCreate: (user) => {
        user.password = hash(user.password)
       },
       beforeUpdate: (user) => {
        user.password = hash(user.password)
       }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};