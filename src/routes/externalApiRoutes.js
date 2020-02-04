const {fetchData} = require('../handlers/externalApiHandler');
// const {fetchDataSchema} = require('../schemas/externalApiSchemas');
// console.log('Entered Routes');
const routeArrays = [
	{path: '/apisfetch', method:'POST', handler: fetchData},
];

module.exports = routeArrays;