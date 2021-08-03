
const Sequelize = require("sequelize");
const database = require("../config/db");

    const User = database.define('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATE
      },
      email: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.NUMBER
      },
      gender: {
        type: Sequelize.STRING
      },
      profile:{
        type: Sequelize.STRING  
      },
      skill:{
        type: Sequelize.STRING
      },
      qualification: {
        type: Sequelize.STRING
      },
      password:{
        type:Sequelize.STRING
      },
    },
    { timestamps: false }
);

module.exports = User;