const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

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