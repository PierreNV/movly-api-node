const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

require("./startup/routes")(app);
require("./startup/config")();
require("./startup/db")();
require("./startup/validation")();

const server = app.listen(port, () =>
	console.log(`Listening on port ${port}...`)
);

module.exports = server;
