const start = require('../../server.js');
const server = start();
const axios = require('axios').default;
const dbUtils = require('../../src/helpers/dbOperations');

const init = async ()=> {
	await server.initialize();
	return server;
};
describe('In the server', () => {
	let server;

	beforeEach(async () => {
		server = await init();
	});

	afterEach(async () => {
		await server.stop();
	});
	
	it ('The route POST /apisfetch should return a statusCode 200', async () => {
		const options = {
			method: 'POST',
			url: '/apisfetch',
			payload: {
				apis:['https://stormy-plains-72807.herokuapp.com/movies', 'https://stormy-plains-72807.herokuapp.com/genres', 'https://stormy-plains-72807.herokuapp.com/actors']
			}
		};
		const mockAxios = jest.spyOn(axios, 'get');
		mockAxios.mockResolvedValue({data:{movies:'movie1', genres:'genre1', actors:'actors1'}});
		const mockInsertMovies = jest.spyOn(dbUtils, 'bulkInsertMovies');
		mockInsertMovies.mockResolvedValue();
		const mockInsertGenres = jest.spyOn(dbUtils, 'bulkInsertGenres');
		mockInsertGenres.mockResolvedValue();
		const mockInsertActors = jest.spyOn(dbUtils, 'bulkInsertActors');
		mockInsertActors.mockResolvedValue();
		const response = await server.inject(options);
		expect(response.statusCode).toBe(200);
	});
	it ('The route POST /apisfetch should return a statusCode 500 when inserting movies into db fails', async () => {
		const options = {
			method: 'POST',
			url: '/apisfetch',
			payload: {
				apis:['https://stormy-plains-72807.herokuapp.com/movies', 'https://stormy-plains-72807.herokuapp.com/genres', 'https://stormy-plains-72807.herokuapp.com/actors']
			}
		};
		const mockAxios = jest.spyOn(axios, 'get');
		mockAxios.mockResolvedValue({data:{movies:'movie1', genres:'genre1', actors:'actors1'}});
		const mockInsertMovies = jest.spyOn(dbUtils, 'bulkInsertMovies');
		mockInsertMovies.mockRejectedValue(new Error('Db Operation failed'));
		const response = await server.inject(options);
		expect(response.statusCode).toBe(500);
		expect(response.result).toBe('Db Operation failed');
	});
});