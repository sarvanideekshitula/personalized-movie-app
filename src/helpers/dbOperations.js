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
module.exports = {bulkInsertMovies, bulkInsertGenres, bulkInsertActors};