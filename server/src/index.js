require("dotenv").config();
require("./db/conn");

const express = require("express");
const cors = require("cors");
const routers = require("./router/routers");

const app = express();
const port = process.env.PORT || 80;

app.use(express.json()).use(express.urlencoded({ extended: true }));

app.use(cors()).use(routers);

app.listen(port, () => console.log(`server listening port at: ${port} `));
