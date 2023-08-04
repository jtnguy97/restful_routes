const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

//parse data from form
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const comments = [
    {
        username: "Todd",
        comment: "LOL that is so funny"
    },
    {
        username: "Mei",
        comment: "omgggg"
    },
    {
        username: "Bee",
        comment: "sdkjfhskdfjhsdf"
    },
    {
        username: "Pauline",
        comment: "LMAO"
    }
]

//index.ejs
app.get('/comments', (req, res) => {
    res.render('comments/index', {comments})
})

//get the form -> new.ejs
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

app.post("/comments", (req, res) => {
    const {username, comment} = req.body;
    comments.push({username, comment});
    res.redirect('/comments');
})


app.get('/tacos', (req, res) => {
    res.send("GET /tacos response");
})

app.post('/tacos', (req, res) => {
    const {meat, qty} = req.body;
    res.send(`OK, here is ${qty} - ${meat} tacos`);
})


app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})