const {fetchData, getMovieData} = require('../handlers/externalApiHandler');
const {fetchDataSchema, getMovieDataSchema} = require('../schemas/externalApiSchemas');

const routeArrays = [
	{path: '/apisfetch', method:'POST', config : {handler: fetchData, validate:{payload: fetchDataSchema}}},
	{path: '/moviedetails/{id}', method:'GET', config : {handler: getMovieData, validate:{params: getMovieDataSchema}}}
];

module.exports = routeArrays;