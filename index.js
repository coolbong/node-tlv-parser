var express = require('express');
var app = express();

var API = require('./routes/api');



app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//app.get('/', function(request, response) {
//  response.render('pages/index');
//});

app.get('/', function(request, response) {
  response.render('pages/parse');
});




// JSON API
app.get('/parse/:data', API.parse);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


