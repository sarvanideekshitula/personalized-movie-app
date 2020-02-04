const dbUtils = require('../helpers/dbOperations');
const axios = require('axios').default;

const fetchData = async (request, h)=> {
	try{
		let data = request.payload;
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

const getMovieData = async(request, h) => {
	try{
		let result = {};
		let movieId = request.params.id;
		const movieDetails = await dbUtils.findOneMovie(movieId);
		result.name = movieDetails.name;
		console.log(movieDetails.genres);
		const genreDetails = await dbUtils.findAllGenres(movieDetails.genres);
		result.genres = genreDetails;
		const actorDetails = await dbUtils.findAllActors();
		let actorsData = [];
		actorDetails.forEach(entry => {
			if(entry.movies.includes(movieId)){
				actorsData.push(entry.name);
			}
		});
		result.actors = actorsData;
		return h.response(result).code(200);
	}
	catch(e){
		console.log(e);
		return h.response(e.message).code(500);
	}
};

module.exports = {fetchData, getMovieData};