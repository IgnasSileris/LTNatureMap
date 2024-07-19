const db = require('../../config/database.js');
const express = require('express');
const router = express.Router();

router.get('/email_availability_check', async (req, res) => {
    const email = req.query.email;
    const [existingEmails, metadata] = await db.query('SELECT email FROM users');
    res.json({available: !existingEmails.includes(email)});
    
});

router.get('/username_availability_check', async (req, res) => {
    const username = req.query.username;
    const [existingUsernames, metadata] = await db.query('SELECT username FROM users');
    res.json({available: !existingUsernames.includes(username)});
    
});


module.exports = router;
