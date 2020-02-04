const Joi = require('@hapi/joi');

const fetchDataSchema = Joi.object({
	apis:Joi.array().required(),
});

module.exports = {fetchDataSchema};