const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/database.js');

const User = db.define('user', {
    userID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isAlphanumeric: true,
            len: [2, 25],
            startsWithLetter(value) {
                if (!(('a'.charCodeAt(0) <= value.charCodeAt(0) && value.charCodeAt(0) <= 'z'.charCodeAt(0)) || ('A'.charCodeAt(0) <= value.charCodeAt(0) && value.charCodeAt(0) <= 'Z'.charCodeAt(0)))){
                    throw new Error('Username must start with a letter');
                }
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 25],
            additionalChecks(value) {
                const upperLowerRegex = /^(?=.*[a-z])(?=.*[A-Z])/; //Regex to check if uppercase and lowercase letter in string
                const numberRegex = /\d/; //Regex to check if at least one numeric value in string
                if (upperLowerRegex.test(value) === false){
                    throw new Error ('Password must contain both uppercase and lowercase characters.')
                }
                if (numberRegex.test(value) === false){
                    throw new Error ('Password must contain a number.');
                }
            }
        }
    },
    verifyPassword: {
        type: DataTypes.VIRTUAL,
        validate: {
            matchPasswords(value) {
                if (value !== this.password){
                    throw new Error('Passwords do not match.');
                }
            }
        }
    },
    activated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    date_created: {
        type: DataTypes.DATE,
    }
});

User.beforeCreate(async (user, options) => {
    if (user.password) {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
    }
});

module.exports = User;