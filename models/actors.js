'use strict';
module.exports = (sequelize, DataTypes) => {
  const actors = sequelize.define('actors', {
    name: DataTypes.STRING,
    movies: DataTypes.ARRAY(DataTypes.STRING)
  }, {});
  actors.associate = function(models) {
    // associations can be defined here
  };
  return actors;
};