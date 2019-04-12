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

            if(!user){
                res.send({
                    success: false,
                    message: 'Authentication failed!'
                });
            }
            else{
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
                    token: token,
                    role: user.role
                });
            }
        })
    } else {
        res.status(400).send({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
}

module.exports.profile = (req, res) => {
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

exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Create a User
    const user = new User({
        username: req.body.username, 
        password: req.body.password,
        role: req.body.role
    });

    // Save Product in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the product."
        });
    });
};

exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving users."
        });
    });
};

exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving user with id " + req.params.userId
        });
    });
};

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    User.findByIdAndUpdate(req.params.userId, {
        username: req.body.username, 
        password: req.body.password,
        role: req.body.role
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.userId
        });
    });
};

exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};