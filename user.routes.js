const middleware = require('./middleware');

module.exports = (app) => {
    const users = require('./user.controller')

    // Authorize to API
    app.post('/authorize', middleware.verifyAppKey, users.authorize);
    app.get('/profile', middleware.isAuthorized, users.profile);

    // Create a new user
    app.post('/users', middleware.isAuthorized, middleware.hasRoles(['admin']), users.create);

    // Retrieve all users
    app.get('/users', middleware.isAuthorized, middleware.hasRoles(['admin']), users.findAll);

    // Retrieve a single user with userId
    app.get('/users/:userId', middleware.isAuthorized, middleware.hasRoles(['admin']), users.findOne);

    // Update a Note with userId
    app.put('/users/:userId', middleware.isAuthorized, middleware.hasRoles(['admin']), users.update);

    // Delete a Note with userId
    app.delete('/users/:userId', middleware.isAuthorized, middleware.hasRoles(['admin']), users.delete);
}