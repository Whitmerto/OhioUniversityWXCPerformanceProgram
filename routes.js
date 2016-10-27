module.exports = function(app) {
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/site.htm');
});

app.get('/home', function(request, response) {
  response.sendFile(__dirname + '/signin.html');
});

app.get('/workoutentry', function(request, response) {
  response.sendFile(__dirname + '/workoutentry.htm');
});

app.get('/myworkouts', function(request, response) {
	response.render('myworkouts.pug');
});

app.get('/admin_athlete_vis', function(request, response) {
	response.sendFile(__dirname + '/admin_athlete_vis.htm');
});

app.get('/admin_add_user', function(request, response) {
	response.sendFile(__dirname + '/admin_add_user.htm');
});

app.get('/admin_remove_user', function(request,response) {
	response.sendFile(__dirname + '/admin_remove_user.htm');
});

app.get('/admin_remove_user', function(request, response) {
	response.sendFile(__dirname + '/admin_remove_user.htm');
});

};
