const db = require('../../config/database.js');
const User = require('../../models/userModel.js');
const { ValidationError } = require('sequelize');
const express = require('express');
const router = express.Router();

router.get('/email_availability_check', async (req, res) => {
    const email = req.query.email;
    const [existingEmails, metadata] = await db.query('SELECT email FROM users');
    res.json({available: !existingEmails.some(obj => obj.email === email)});
});

router.get('/username_availability_check', async (req, res) => {
    const username = req.query.username;
    const [existingUsernames, metadata] = await db.query('SELECT username FROM users');
    res.json({available: !existingUsernames.some(obj => obj.username === username)});    
});

router.post('/create_user', async (req, res) => {
    const email = req.query.email;
    const username = req.query.username;
    const pass1 = req.query.password1;
    const pass2 = req.query.password2;

    try {
        await User.create({ 
            email: email,
            username: username, 
            password: pass1,
            verifyPassword: pass2
        });
        res.status(200).json({});
    }
    catch(error){
        const invalid = [];
        if (error instanceof ValidationError) {
            error.errors.forEach((err) => {
                invalid.push(err.path);
            });
        }
        res.status(400).json({errors: invalid});
    }
});

router.get('/get_users', async (req, res) => {
    const [existingUsers, metadata] = await db.query('SELECT * FROM users');
    res.json({users: existingUsers});
});

router.delete('/delete_user', async (req, res) => {
    const flagged = req.query.username;
    try {
        await User.destroy({
            where: {
                username: flagged
            },
        });
        res.json({'User deleted': flagged});
    }
    catch (err) {
        res.json({'User not found': flagged})
    }
});

module.exports = router;
