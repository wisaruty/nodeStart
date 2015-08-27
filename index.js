var users = require('./users');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 7777;
var mysql = require('mysql');

var connection =  mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'root',
  database : 'testdb'
});

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));




app.get('/', function (req, res) {
    res.send('<h1>Hello Node.js</h1>');
});

app.get('/user', function (req, res) {
    res.json(users.findAll());
});

app.get('/test', function (req, res) {
    res.send('Hello Test master');
});

app.get('/user/:id', function (req, res) {
    var id = req.params.id;
    res.json(users.findById(id));
});

app.post('/newuser', function (req, res) {
    var json = req.body;
    console.log(json);
    res.send('Add new ' + json.name + ' Completed!');
});

app.get('/conn', function (req, res) {
  connection.query('SELECT * FROM users', function(err, rows){
    if (err) {
      throw err;
    }
    res.json(rows);
  })
});

app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});

