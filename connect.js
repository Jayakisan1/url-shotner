const mongoose = require('mongoose');

async function DBconnect(url) {
    console.log('Connecting to DB');
    return mongoose.connect(url)
};

module.exports = {DBconnect};