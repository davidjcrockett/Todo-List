const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');

const TodoSchema = require("./models/TodoSchema");

PORT = 3000;

dotenv.config();

app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended : true }));

app.set("view engine", "ejs");

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser : true }, () => {
    console.log("Connected to DB!");

    app.listen(PORT, () => console.log(`Listening on channel ${PORT}`));
});

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/', async (req, res) => {
    const todoTask = new TodoSchema({
        content: req.body.content
    });
    try {
        await todoTask.save();
        res.redirect("/");    
    } catch (err) {
        res.redirect("/");
    }
});