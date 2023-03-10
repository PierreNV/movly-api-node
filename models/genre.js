const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 50,
	},
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
	const schema = Joi.object({
		name: Joi.string().max(50),
	});
	const { error } = schema.validate(genre);
	if (error) console.log(error);
	return genre;
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;
