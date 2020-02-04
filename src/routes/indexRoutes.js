const externalApiRoutes = require('./externalApiRoutes');
// console.log('Entered Index Routes');

const routes = [];
routes.push(...externalApiRoutes);

module.exports = routes;