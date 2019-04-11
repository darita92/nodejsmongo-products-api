const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    role: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UserSchema);