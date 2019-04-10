const jwt = require('jsonwebtoken');
const config = require('./config.js');

const verifyAppKey = (req, res, next) => {
    let appKey = req.headers['application-key'] || '';
    if(appKey !== config.appKey){
        return res.status(401).send({
            success: false,
            message: 'App Key was not provided'
        });
    }
    else{
        next();
    }
};

const isAuthorized = (req, res, next) => {
  let token = req.headers['authorization'] || '';
  if (token.startsWith('Bearer ')) {
    token = token.replace('Bearer ', '');
  }

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.send({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

const hasRoles = (roles) => {
    return (req, res, next) => {
        let role = req.decoded.role;
        if(roles.indexOf(role) === -1){
            return res.status(401).send({
                success: false,
                message: 'Current role is not allowed for this method'
            });
        }
        else{
            next();
        }
    };
};

module.exports = {
    verifyAppKey: verifyAppKey,
    isAuthorized: isAuthorized,
    hasRoles: hasRoles
}