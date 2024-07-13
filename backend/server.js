const express = require('express');
const db = require('./src/config/database.js');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

db.authenticate()
    .then(async () => {
        console.log('Connection to database has been established.');
        await db.sync();
        console.log('Database synced.');
    })
    .catch((err) => {
        console.error('Connection to database failed: ', err);
    });

db.queryInterface.showAllTables()
    .then(tableNames => {
        console.log('Existing tables:', tableNames);
    })
    .catch(err => {
        console.error('Error occurred while fetching existing tables:', err);
    });

const app = express();

// app.get('/test', (req,res) => {
//     res.json({hello:'world'})
// })

// app.post('/api/user', (req,res) => {
    
// })

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});
