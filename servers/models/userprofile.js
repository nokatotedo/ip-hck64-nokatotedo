'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User, {
        as: 'profiles',
        foreignKey: 'userId'
      })
    }
  }
  UserProfile.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is required."
        },
        notEmpty: {
          msg: "Name is required."
        },
        len: {
          args: [5, 25],
          msg: "Name must be between 5-25 characters"
        }
      }
    },
    phoneNumber: DataTypes.STRING,
    imgUrl: {
      type: DataTypes.STRING,
      defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
      validate: {
        isUrl: {
          msg: "Image format is invalid."
        },
        isContain(value) {
          const imageType = ["png", "jpeg", "jpg", "webp"]

          let notContain = true
          for(let type of imageType) {
            if(value.includes(type)) {
              notContain = false
              break
            }
          }
          if(notContain) throw new Error('Image format is invalid.')
        }
      }
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};