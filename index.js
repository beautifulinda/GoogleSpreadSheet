var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var addRow = require('./addRow.js')
var updRow = require('./updRow.js')

app.get('/', function(req, res) {
    res.send('Hello World');
});

// http://localhost:3000/addRow
app.use(bodyParser.json())
app.post('/addRow', function(req, res) {
    addRow(req.body);
    res.send('addRow done.');
});
app.post('/updRow', function(req, res) {
    console.log(req.body);
    updRow(req.body);
    res.send('updRow done.');
});

app.listen(3000);
