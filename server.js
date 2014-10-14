var express = require('express')
 ,  http = require('http')
 ,  path = require('path')
 ,  debug = require('debug')('server')
 ,  mongoose = require('mongoose')
 ,  bodyParser = require('body-parser')
 ,  methodOverride = require('method-override')
 ,  app = express();



app.set( 'port', process.env.PORT || 3000 );

app.use('/', express.static(path.join( __dirname, 'public' )));
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true } ));

var server = app.listen( app.get( 'port' ), function() {
  debug( 'Express server listening on port ' + server.address().port );
  console.log( "Express server listening on port", server.address().port  )
});

exports = module.exports = app;