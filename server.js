var express = require('express')
 ,  http = require('http')
 ,  path = require('path')
 ,  debug = require('debug')('server')
 ,  bodyParser = require('body-parser')
 ,  app = express();

app.set( 'port', process.env.PORT || 3000 );

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true } ));

var server = app.listen( app.get( 'port' ), function() {
  debug( 'Express server listening on port ' + server.address().port );
  console.log( "Express server listening on port", server.address().port  )
});

exports = module.exports = app;