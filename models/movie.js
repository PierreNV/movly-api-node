const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const Movie = mongoose.model(
	"Movies",
	new mongoose.Schema({
		title: {
			type: String,
			required: true,
			trim: true,
			maxlength: 50,
		},
		genre: {
			type: genreSchema,
			required: true,
		},
		numberInStock: {
			type: Number,
			required: true,
			min: 0,
			max: 255,
		},
		dailyRentalRate: {
			type: Number,
			required: true,
			min: 0,
			max: 255,
		},
		liked: {
			type: Boolean,
		},
	})
);

function validateMovie(movie) {
	const schema = Joi.object({
		title: Joi.string().max(50),
		genreId: Joi.objectId(),
		numberInStock: Joi.number().min(0),
		dailyRentalRate: Joi.number().min(0),
	});
	const { error } = schema.validate(movie);
	if (error) console.log(error);
	return movie;
}

exports.Movie = Movie;
exports.validate = validateMovie;
