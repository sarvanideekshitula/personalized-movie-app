const dbUtils = require('../../src/helpers/dbOperations');
const db = require('../../models/index');

describe('In dbUtils', () => {
	describe('The function bulkInsertMovies', () => {
		it ('should create an entries in movies', async() => {
			const mockCreateMovies = jest.spyOn(db.movies, 'bulkCreate');
			mockCreateMovies.mockResolvedValue();
			await dbUtils.bulkInsertMovies([{'id':'6638453965','name':'The Shawshank Redemption','genres':[2,4]}]);
			expect(mockCreateMovies).toHaveBeenCalledWith([{'id':'6638453965','name':'The Shawshank Redemption','genres':[2,4]}]);
			mockCreateMovies.mockRestore();
		});
	});
	describe('The function bulkInsertGenres', () => {
		it ('should create an entries in genres', async() => {
			const mockCreateGenres = jest.spyOn(db.genres, 'bulkCreate');
			mockCreateGenres.mockResolvedValue();
			await dbUtils.bulkInsertGenres([{'name':'Crime','id':1}]);
			expect(mockCreateGenres).toHaveBeenCalledWith([{'name':'Crime','id':1}]);
			mockCreateGenres.mockRestore();
		});
	});
	describe('The function bulkInsertActors', () => {
		it ('should create an entries in actors', async() => {
			const mockCreateActors = jest.spyOn(db.actors, 'bulkCreate');
			mockCreateActors.mockResolvedValue();
			await dbUtils.bulkInsertActors([{'name':'Brad Pitt','movies':['7533474498','1393797017','6621531523']}]);
			expect(mockCreateActors).toHaveBeenCalledWith([{'name':'Brad Pitt','movies':['7533474498','1393797017','6621531523']}]);
			mockCreateActors.mockRestore();
		});
	});
});