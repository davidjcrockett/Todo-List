const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
PORT = 3000;

dotenv.config();

app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended : true }));

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser : true }, () => {
    console.log("Connected to DB!");

    app.listen(PORT, () => console.log(`Listening on channel ${PORT}`));
});

app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/', (req, res) => {
    console.log(req.body);
});