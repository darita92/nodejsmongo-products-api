const config = require('./config.js');
const mongoose = require('mongoose');
const User = require('./user.model')

mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
    let user = new User({
        username: 'admin',
        password: 'admin',
        role: 'admin'
    });
    
    user.save()
    .then(data => {
        console.log(`Successfully created user ${data.username}`)
        console.log(data);
        process.exit();
    }).catch(err => {
        console.log({
            message: err.message || "Something wrong while creating the user."
        });
        process.exit();
    });
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});