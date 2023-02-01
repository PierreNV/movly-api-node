const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/routes")(app);

const config = require("config");
const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
	console.log(`Listening on port ${port}...`)
);

module.exports = server;
