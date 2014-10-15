var async = require('async');
API = [ process.env.KEY, process.env.SECRET ];

  OpenTok = require('opentok')
module.exports = function( app ) {

app.get('/', function( req, res ) {
    res.render('index.ejs')
})


app.get('/connect', function( req, res ) {

var opentok = new OpenTok( API[0], API[1] );

// create new OpenTok session, init server on session-success
opentok.createSession(function( err, session ) {
  if ( err ) throw err;
  app.set( 'sessionId', session.sessionId );
  callback(res);
});

var sessionId = app.get('sessionId'),
// creates a new token for client-connect
token = opentok.generateToken( sessionId );

function callback(){
  res.render('connect.ejs', {
    apiKey: API[0],
    sessionId: sessionId,
    token: token
  });
 }
});
}
