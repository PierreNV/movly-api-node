const Joi = require("joi");
const mongoose = require("mongoose");

const Customer = mongoose.model(
	"Customer",
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			maxlength: 15,
		},
		isGold: {
			type: Boolean,
			default: false,
		},
		phone: {
			type: String,
			required: true,
			maxlength: 15,
		},
	})
);

function validateCustomer(customer) {
	const schema = Joi.object({
		name: Joi.string().max(15).required(),
		phone: Joi.string().max(15).required(),
		isGold: Joi.boolean(),
	});
	const { error } = schema.validate(customer);
	if (error) console.log(error);
	return customer;
}

exports.Customer = Customer;
exports.validate = validateCustomer;
