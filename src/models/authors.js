'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class authors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      authors.hasMany(models.posts, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      authors.hasMany(models.comments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  authors.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    email: DataTypes.STRING,
    profile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'authors',
  });
  return authors;
};