const {fetchData, getMovieData} = require('../../src/handlers/externalApiHandler');
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

describe('The funcntion getMovieDetails', () => {
	it ('should call response with the status 200 and success message', async() => {
		const codeMock = jest.fn();
		const mockHandler = {
			response: jest.fn(
				() => {
					return {code: codeMock};
				}),
		};
		const mockRequest = {
			params:{
				id:'7533474498'
			}
		};
		const mockInsertMovies = jest.spyOn(dbUtils, 'findOneMovie');
		mockInsertMovies.mockResolvedValue({'id':'7533474498','name':'Moneyball','genres':[4]});
		const mockInsertGenres = jest.spyOn(dbUtils, 'findAllGenres');
		mockInsertGenres.mockResolvedValue([{'name':'Romance','id':4}]);
		const mockInsertActors = jest.spyOn(dbUtils, 'findAllActors');
		mockInsertActors.mockResolvedValue([{'name':'Brad Pitt','movies':['7533474498','1393797017','6621531523']}]);
		await getMovieData(mockRequest, mockHandler);
		expect(codeMock).toHaveBeenCalledWith(200);
		expect(mockHandler.response).toHaveBeenCalledWith({
			name: 'Moneyball',
			genres: [ { name: 'Romance', id: 4 } ],
			actors: [ 'Brad Pitt' ]
		});
	});
	it ('should call response with the status 500 when get request fails', async() => {
		const codeMock = jest.fn();
		const mockHandler = {
			response: jest.fn(
				() => {
					return {code: codeMock};
				}),
		};
		const mockRequest = {
			params:{
				id:'7533474498'
			}
		};
		const mockInsertMovies = jest.spyOn(dbUtils, 'findOneMovie');
		mockInsertMovies.mockRejectedValue(new Error('Failed to get data'));
		const mockInsertGenres = jest.spyOn(dbUtils, 'findAllGenres');
		mockInsertGenres.mockRejectedValue(new Error('Failed to get data'));
		const mockInsertActors = jest.spyOn(dbUtils, 'findAllActors');
		mockInsertActors.mockRejectedValue(new Error('Failed to get data'));
		await getMovieData(mockRequest, mockHandler);
		expect(codeMock).toHaveBeenCalledWith(500);
		expect(mockHandler.response).toHaveBeenCalledWith('Failed to get data');
	});
});
