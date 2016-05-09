var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var addRow = require('./addRow.js');
var updRow = require('./updRow.js');
var delRow = require('./delRow.js');
var isValidDoc = require('./checkDocId.js');

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
// http://localhost:3000/googlesheet/addRow 
app.post('/googlesheet/addRow', function(req, res) {
    if (!isValidDoc(req.body.key)) {
        res.send('This service is for demostration only.');
    } else {
        addRow(req.body);
        res.send('addRow done.');
    }
});
// http://localhost:3000/googlesheet/addRow
app.post('/googlesheet/updRow', function(req, res) {
    if (!isValidDoc(req.body.key)) {
        res.send('This service is for demostration only.');
    } else {
        updRow(req.body);
        res.send('updRow done.');
    }
});
// http://localhost:3000/googlesheet/delRow
app.post('/googlesheet/delRow', function(req, res) {
    if (!isValidDoc(req.body.key)) {
        res.send('This service is for demostration only.');
    } else {
        delRow(req.body);
        res.send('delRow done.');
    }
});

app.listen(3000);
