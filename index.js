import express from "express";
const app = express();

import cors from "cors";
app.use(cors());

require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/routes")(app);

import { get } from "config";
const port = process.env.PORT || get("port");
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

export default server;
