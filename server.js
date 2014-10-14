var express = require('express')
  , http = require('http')
  , OpenTok = require('opentok')
  , dotenv = require('dotenv')
  , app = express()
    dotenv.load();


var API = [ process.env.KEY, process.env.SECRET ]

app.set( 'port', process.env.PORT || 3000 );
app.use(express.static(__dirname + '/public'));

// create new OpenTok instance
var opentok = new OpenTok( API[0], API[1] );

// create new OpenTok session, init server on session-success
opentok.createSession(function( err, session ) {
  if ( err ) throw err;
  app.set( 'sessionId', session.sessionId );
  callback();
});

app.get('/', function( req, res ) {
  var sessionId = app.get('sessionId'),
      // creates a new token for client-connect
      token = opentok.generateToken( sessionId );

  res.render('index.ejs', {
    apiKey: API[0],
    sessionId: sessionId,
    token: token
  });
});


function callback() {
var server = app.listen( app.get( 'port' ), function() {
  console.log( "Server listening on port", server.address().port  )
})
}