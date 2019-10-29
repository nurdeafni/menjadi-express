'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todos = sequelize.define('Todos', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    dateActivity: DataTypes.DATE
  }, {});
  Todos.associate = function(models) {
    // associations can be defined here
  };
  return Todos;
};