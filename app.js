const express = require("express");

const app = express();

app.set("view engine", "ejs");

PORT = 3000;

app.listen(PORT, () => console.log(`Listening on channel ${PORT}`))