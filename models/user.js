const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 50,
	},
	email: {
		type: String,
		required: true,
		maxlength: 255,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024,
	},
	isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{
			_id: this._id,
			name: this.name,
			email: this.email,
			isAdmin: this.isAdmin,
		},
		config.get("jwtPrivateKey")
	);
	return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
	const schema = Joi.object({
		name: Joi.string().max(50),
		email: Joi.string().max(255).email(),
		password: Joi.string().min(5).max(255),
	});
	const { error } = schema.validate(user);
	if (error) console.log(error);
	return user;
}

exports.User = User;
exports.validate = validateUser;
