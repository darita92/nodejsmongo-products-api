const middleware = require('./middleware');

module.exports = (app) => {
    const authorize = require('./authorize.controller')

    // Authorize to API
    app.post('/authorize', middleware.verifyAppKey, authorize);
}