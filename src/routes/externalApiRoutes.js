const {fetchData, getMovieData, insertMovieData} = require('../handlers/externalApiHandler');
const {fetchDataSchema, getMovieDataSchema} = require('../schemas/externalApiSchemas');

const routeArrays = [
	{path: '/apisfetch', method:'POST', config : {handler: fetchData, validate:{payload: fetchDataSchema}}},
	{path: '/moviedetails/{id}', method:'GET', config : {handler: getMovieData, validate:{params: getMovieDataSchema}}},
	{path: '/moviedetails', method:'POST', handler:insertMovieData},
];

module.exports = routeArrays;