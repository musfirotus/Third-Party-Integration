'use strict';
const {
  Model
} = require('sequelize');
const Author = require('./authors')
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comments.belongsTo(models.authors, {foreignKey: comments.authorId});
      comments.belongsTo(models.posts, {foreignKey: comments.postId});
    }
  };
  comments.init({
    content: DataTypes.TEXT,
    status: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    url: DataTypes.STRING,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};