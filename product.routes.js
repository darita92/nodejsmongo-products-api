const middleware = require('./middleware')

module.exports = (app) => {
    const products = require('./product.controller.js');

    // Create a new Product
    app.post('/products', middleware.isAuthorized, middleware.hasRoles(['admin']), products.create);

    // Retrieve all Products
    app.get('/products', middleware.isAuthorized, products.findAll);

    // Retrieve a single Product with productId
    app.get('/products/:productId', middleware.isAuthorized, products.findOne);

    // Update a Note with productId
    app.put('/products/:productId', middleware.isAuthorized, middleware.hasRoles(['admin']), products.update);

    // Delete a Note with productId
    app.delete('/products/:productId', middleware.isAuthorized, middleware.hasRoles(['admin']), products.delete);
}