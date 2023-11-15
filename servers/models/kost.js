'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kost.belongsTo(models.User, {
        as: 'owner',
        foreignKey: 'ownerId'
      })
    }
  }
  Kost.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is required."
        },
        notEmpty: {
          msg: "Name is required."
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Address is required."
        },
        notEmpty: {
          msg: "Address is required."
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue:
      `Selamat datang di Kosth, tempat terbaik untuk menemukan kenyamanan dan kepraktisan dalam penyewaan kamar. Kami menyediakan pilihan kamar yang luas dan nyaman untuk kebutuhan singkat atau panjang Anda. Dengan lokasi yang strategis, Anda dapat dengan mudah mengakses berbagai fasilitas di sekitar area kost. Nikmati pengalaman menginap yang tak terlupakan dengan layanan terbaik kami. Temukan kenyamanan seperti di rumah, hanya di Kosth`
    },
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Kost',
  });
  return Kost;
};