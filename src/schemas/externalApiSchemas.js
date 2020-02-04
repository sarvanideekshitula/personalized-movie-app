const Joi = require('@hapi/joi');

const fetchDataSchema = Joi.object({
	apis:Joi.array().required(),
});

const getMovieDataSchema = Joi.object({
	id:Joi.string().required(),
});
module.exports = {fetchDataSchema, getMovieDataSchema};