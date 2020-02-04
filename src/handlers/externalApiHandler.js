const dbUtils = require('../helpers/dbOperations');
const axios = require('axios').default;

const fetchData = async (request, h)=> {
	try{
		// console.log('Entered handlers');
		let data = request.payload;
		// console.log(data.apis[0]);
		const moviesData = await axios.get(data.apis[0]);
		const genresData = await axios.get(data.apis[1]);
		const actorsData = await axios.get(data.apis[2]);
		await dbUtils.bulkInsertMovies(moviesData.data.movies);
		await dbUtils.bulkInsertGenres(genresData.data.genres);
		await dbUtils.bulkInsertActors(actorsData.data.actors);
		return h.response('Data inserted into models successfully').code(200);
	}
	catch(e){
		console.log(e);
		return h.response(e.message).code(500);
	}
};

module.exports = {fetchData};