const jwt = require('jsonwebtoken')
const config = require('./config')

module.exports = (req, res) => {
    let role = req.body.role;
    if (role) {
        let token = jwt.sign({ role: role },
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
    } else {
        res.status(400).send({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
}