const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
const routes = require('./api/routes/routes')
const cors = require('cors')

app.use(express.json());
app.use(cors())

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true }); 
mongoose.connection
.once("open", () => console.log('Connected')) 
.on("error", error => {
    console.log("MongoDB Error: " + error);
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(express.static("public"))

routes(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})