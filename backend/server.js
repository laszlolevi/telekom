const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/', require('./route/api'));

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
})