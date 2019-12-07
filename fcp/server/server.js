const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('../public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/problems', {
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const problems = require("./problems.js");
app.use("/api/problems", problems);

const users = require("./users.js");
app.use("/api/users", require("./users.js"));


app.listen(4209, () => console.log('Server listening on port 4209!'));