const {fetchData} = require('../../src/handlers/externalApiHandler');
const dbUtils = require('../../src/helpers/dbOperations');
const axios = require('axios').default;

describe('The function fetchData', () => {
	it ('should call response with the status 200 and success message', async() => {
		const codeMock = jest.fn();
		const mockHandler = {
			response: jest.fn(
				() => {
					return {code: codeMock};
				}),
		};
		const mockRequest = {
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
		await fetchData(mockRequest, mockHandler);
		expect(codeMock).toHaveBeenCalledWith(200);
		expect(mockHandler.response).toHaveBeenCalledWith('Data inserted into models successfully');
	});
	it('should call response with  statuscode 500 when the insert fails', async() => {
		const codeMock = jest.fn();
		const mockHandler = {
			response: jest.fn(
				() => {
					return {code: codeMock};
				}),
		};
		const mockRequest = {
			payload: {
				apis:['https://stormy-plains-72807.herokuapp.com/movies', 'https://stormy-plains-72807.herokuapp.com/genres', 'https://stormy-plains-72807.herokuapp.com/actors']
			}
		};
		const mockAxios = jest.spyOn(axios, 'get');
		mockAxios.mockResolvedValue({data:{movies:'movie1', genres:'genre1', actors:'actors1'}});
		const mockInsertMovies = jest.spyOn(dbUtils, 'bulkInsertMovies');
		mockInsertMovies.mockRejectedValue(new Error('Failed to insert data'));
		await fetchData(mockRequest, mockHandler);
		expect(codeMock).toHaveBeenCalledWith(500);
		expect(mockHandler.response).toHaveBeenCalledWith('Failed to insert data');
	});
});
