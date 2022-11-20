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

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser : true , useUnifiedTopology: true,}, () => {
    console.log("Connected to DB!");

    app.listen(PORT, () => console.log(`Listening on channel ${PORT}`));
});

// READ
app.get('/', (req, res) => {
    TodoSchema.find({}, (err, tasks) => {
        res.render('index.ejs', { todoTasks: tasks });
    });
});

// CREATE
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

// UPDATE
app
    .route("/edit/:id")
    .get((req, res) => {
        const id = req.params.id;
        TodoSchema.find({}, (err, tasks) => {
            res.render("edit.ejs", { todoTasks: tasks, idTask: id });
        });
    })
    .post((req, res) => {
        const id = req.params.id;

        TodoSchema.findByIdAndUpdate(id, { content: req.body.content }, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });

//DELETE
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoSchema.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
        });
    });