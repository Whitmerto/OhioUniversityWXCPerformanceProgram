var express = require('express');
var path = require("path");
//var logger = require('morgan');
var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
var db = require('./db');

var app = express();

/*
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
*/
app.use(express.static(__dirname + '/'));
app.use(express.static('materialize'));
app.set('port', (process.env.PORT || 5000));


//LOAD ROUTES
require('./routes')(app);

//BODY PARSER
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post("/", function(req, res){
  console.log(req.body.user)
  console.log(req.body.pass)
  var user = req.body.user;
  var pass = req.body.pass;
  /*var queryString = `INSERT INTO ouwxcpp_db.user(username, email, password, create_time)  						VALUES  ("${user}", "robbie.whitmer@gmail.com", "${pass}", NOW())`;
  db.query(queryString, function(err, rows, fields) {
    if (err) throw err;
  });
*/
  if((typeof user !== 'undefined')){
      var queryString = `SELECT * FROM ouwxcpp_db.user WHERE username="${user}"`;
      db.query(queryString, function(err, rows, fields) {
        if (err) throw err;
        if (rows.length > 0){
        	if(pass === rows[0].password){
        		console.log('Correct password!');
      			  res.redirect('/signin.html');
        		console.log('Did we make it here?');
        	}
        	else{
        		console.log('Incorrect Password');
            res.redirect('/site.htm');
          }
        }
        else{
        	console.log('Not a user');
          res.redirect('/site.htm');
        }
    });
  }
});

//WORKOUT ENTRY FORM PARSER
app.post("/workoutentry", function(req, res){
  console.log(req.body.healthstatus)
  console.log(req.body.illness)
  console.log(req.body.injury)
  console.log(req.body.time)
  console.log(req.body.distance)
  var healthstatus = req.body.healthstatus;
  var illness = req.body.illness;
  var injury = req.body.injury;
  var time = req.body.time;
  var distance = req.body.distance;

  var queryString2 = `INSERT INTO ouwxcpp_db.athlete_data(athlete, date, sleep, Illness, Injury, percent_health, cycle_start, notes) VALUES ("WillSmith", NOW(), "10", "${illness}", "${injury}", "100", NOW(), "just dummy data for testing")`;
  db.query(queryString2, function(err, result) {
    console.log(err)
    console.log(result)
  });

  res.redirect('/workoutentry.htm');
});
/*var queryString = 'SELECT * FROM Roles;';
db.query(queryString, function(err, rows, fields) {
    if (err) throw err;
    for (var i in rows) {
        console.log('Data: ', rows[i]);
    }
});
*/


// LAUNCH
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
