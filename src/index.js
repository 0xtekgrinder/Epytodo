require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
var auth = require('./routes/auth/auth.js');
var user = require('./routes/user/user.js');
var todo = require('./routes/todos/todos.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', auth);
app.use('/user', user);
app.use('/todo', todo);

app.listen(process.env.APP_PORT, () => {
    console.log(`app listening at http://localhost: `, process.env.APP_PORT);
});