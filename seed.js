const { Genre } = require("./models/genre");
const { Movie } = require("./models/movie");
const { User } = require("./models/user");
const mongoose = require("mongoose");
const config = require("config");
const db = config.get("db");

const data = [
	{
		name: "Comedy",
		movies: [
			{ title: "Airplane", numberInStock: 5, dailyRentalRate: 2 },
			{ title: "The Hangover", numberInStock: 10, dailyRentalRate: 2 },
			{ title: "Wedding Crashers", numberInStock: 15, dailyRentalRate: 2 },
		],
	},
	{
		name: "Action",
		movies: [
			{ title: "Die Hard", numberInStock: 5, dailyRentalRate: 2 },
			{ title: "Terminator", numberInStock: 10, dailyRentalRate: 2 },
			{ title: "The Avengers", numberInStock: 15, dailyRentalRate: 2 },
		],
	},
	{
		name: "Romance",
		movies: [
			{ title: "The Notebook", numberInStock: 5, dailyRentalRate: 2 },
			{ title: "When Harry Met Sally", numberInStock: 10, dailyRentalRate: 2 },
			{ title: "Pretty Woman", numberInStock: 15, dailyRentalRate: 2 },
		],
	},
	{
		name: "Thriller",
		movies: [
			{ title: "The Sixth Sense", numberInStock: 5, dailyRentalRate: 2 },
			{ title: "Gone Girl", numberInStock: 10, dailyRentalRate: 2 },
			{ title: "The Others", numberInStock: 15, dailyRentalRate: 2 },
		],
	},
];

const dataUsers = [
	{ name: "Seed User", email: "seed@email.com", password: "password" },
];

async function seed() {
	await mongoose.connect(db);
	await Movie.deleteMany({});
	await Genre.deleteMany({});
	await User.deleteMany({});

	for (let genre of data) {
		const { _id: genreId } = await new Genre({ name: genre.name }).save();
		const movies = genre.movies.map((movie) => ({
			...movie,
			genre: { _id: genreId, name: genre.name },
		}));
		await Movie.insertMany(movies);
	}

	for (let user of dataUsers) {
		await new User({
			name: user.name,
			email: user.email,
			password: user.password,
		}).save();
	}

	mongoose.disconnect();

	console.info("Done!");
}

seed();
