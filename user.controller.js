const jwt = require('jsonwebtoken')
const config = require('./config')
const User = require('./user.model')

module.exports.authorize = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        User.findOne({
            username,
            password
        }, (err, user) => {
            if(err){
                res.status(500).send({
                    success: false,
                    message: 'There was an error getting the user'
                });
            }
            let token = jwt.sign({ role: user.role, username: user.username },
                config.secret,
                {
                    expiresIn: '24h' // expires in 24 hours
                }
            );
            // return the JWT token for the future API calls
            res.send({
                success: true,
                message: 'Authentication successful!',
                token: token
            });
        })
    } else {
        res.status(400).send({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
}

module.exports.findUser = (req, res) => {
    let decoded = req.decoded;
    if (decoded) {
        res.send({
            success: true,
            message: '',
            user: decoded
        });
    } else {
        res.status(400).send({
            success: false,
            message: 'Unable to retreive User'
        });
    }
}