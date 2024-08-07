const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
