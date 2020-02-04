'use strict';
module.exports = (sequelize, DataTypes) => {
  const movies = sequelize.define('movies', {
    id: DataTypes.STRING,
    name: DataTypes.STRING,
    genres: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {});
  movies.associate = function(models) {
    // associations can be defined here
  };
  return movies;
};