const path = require("node:path");
const express = require('express');
const app = express();

const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs")

const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        text: "Hello world!",
        user: "Charles",
        added: new Date()
    }
];

app.use(express.urlencoded({ extended: true }));

app.post("/new", (req, res) => {
    const { author, message } = req.body;
    messages.push({ text: message, user: author, added: new Date() });
    res.redirect("/");
} )

app.get("/new", (req,res) => {
    res.render("form");
})

app.get("/", (req, res) => {
    res.render("index", { title: "Mini messageboard", messages: messages });
})

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Listening on port ${PORT}`);
})