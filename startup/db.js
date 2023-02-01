const mongoose = require("mongoose");
const config = require("config");
const db = config.get("db");

// const URI = config.get("URI");
// const database = config.get("database");
// const options = {
// 	dbName: database,
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// };

module.exports = function () {
	try {
		mongoose.connect(db);
		console.log("connected to db");
	} catch (error) {
		console.log("fail to connect to db");
	}

	// const collection = mongoose.db("movly").collection("genres");
	// // perform actions on the collection object
	// mongoose.close();
};
