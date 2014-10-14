var express = require('express')
 ,  http = require('http')
 ,  path = require('path')
 ,  debug = require('debug')('server')
 ,  bodyParser = require('body-parser')
 ,  dotenv = require('dotenv')
 ,   OpenTok = require('opentok')
 ,  app = express();

dotenv.load();
opentok = new OpenTok( process.env.apiKey, process.env.apiSecret );



app.set( 'port', process.env.PORT || 3000 );

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true } ));

opentok.createSession(function( err, session ) {
  if ( err ) throw err;
  app.set('sessionId', session.sessionId);
  // init is the callback to invoke the app
  init();
});

 app.get('/', function( req, res ){
    streamAuth =  { apiKey: process.env.apiKey, sessionId: process.env.apiSecret, token: process.env.token }
    console.log( )
    res.sendfile( streamAuth );
    });


function init() {
var server = app.listen( app.get( 'port' ), function() {
  debug( 'Express server listening on port ' + server.address().port );
  console.log( "Express server listening on port", server.address().port  )
})
}
exports = module.exports = app;