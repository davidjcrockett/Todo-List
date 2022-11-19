const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended : true }));

app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/', (req, res) => {
    console.log(req.body);
});

PORT = 3000;

app.listen(PORT, () => console.log(`Listening on channel ${PORT}`))