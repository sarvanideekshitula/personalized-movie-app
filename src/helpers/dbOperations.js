const db = require('../../models/index');

const bulkInsertMovies = async (data) => {
	await db.movies.bulkCreate(data);
};

const bulkInsertGenres = async (data) => {
	await db.genres.bulkCreate(data);
};

const bulkInsertActors = async (data) => {
	await db.actors.bulkCreate(data);
};

const findOneMovie = async(movieId) => {
	const movieData = await db.movies.findOne({where: {
		id:movieId
	}});
	console.log(movieData);
	return movieData;
};


const findAllGenres = async(movieGenres) => {
	let genres = [];
	movieGenres.forEach(async genre => {
		const genreData = await db.genres.findOne({where: {
			id:genre
		}});
		genres.push(genreData.dataValues.name);
	});
	return genres;
};

const findAllActors = async() => {
	const actorsData = await db.actors.findAll();
	return actorsData;
};

const insertMovie = async(data) => {
	await db.movies.create({id:data.id, name:data.name, genres:data.genres});
};

const findOneGenre = async(genre) => {
	const genreId = await db.genres.findOne({where: {
		name:genre
	}});
	return genreId;
};

const insertGenre = async(data) => {
	await db.genres.create({name:data});
};

module.exports = {bulkInsertMovies, bulkInsertGenres, bulkInsertActors, findOneMovie, findAllGenres, findAllActors, insertMovie, findOneGenre, insertGenre};