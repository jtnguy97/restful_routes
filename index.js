const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");

app.use(express.json());

//parse data from form
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let comments = [
    {
        id: uuid(),
        username: "Todd",
        comment: "LOL that is so funny"
    },
    {
        id: uuid(), 
        username: "Mei",
        comment: "omgggg"
    },
    {
        id: uuid(),
        username: "Bee",
        comment: "sdkjfhskdfjhsdf"
    },
    {
        id: uuid(),
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
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments');
})

app.get("/comments/:id", (req, res) => {
    const {id} = req.params;
    const comment = comments.find( c => c.id === id )
    res.render('comments/show', { comment })
})

app.get('/comments/:id/edit', (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})


app.patch('/comments/:id', (req, res) => {
   const {id} = req.params;
   const newCommentText = req.body.comment;
   const foundComment = comments.find(c=> c.id === id);
   foundComment.comment = newCommentText;
   
   res.redirect('/comments');
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;

    //use filter to remove comments
    //keep all comments that are not the the current id, filters out the id you want to delete
    comments = comments.filter(c => c.id !== id);
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