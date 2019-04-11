const middleware = require('./middleware');

module.exports = (app) => {
    const user = require('./user.controller')

    // Authorize to API
    app.post('/authorize', middleware.verifyAppKey, user.authorize);
    app.get('/profile', middleware.isAuthorized, user.findUser);
}