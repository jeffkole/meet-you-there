API = [ process.env.KEY, process.env.SECRET ];

var async = require('async')
 ,  OpenTok = require('opentok')
var opentok = new OpenTok( API[0], API[1] );
module.exports = function( app ) {

app.get('/', function( req, res ) {
    res.render('index.ejs')
})

app.get('/connect', function( req, res ) {

  var sessionId = app.get('sessionId'),
      // generate a fresh token for this client
      token = opentok.generateToken(sessionId);

  res.render('connect.ejs', {
    apiKey: API[0],
    sessionId: sessionId,
    token: token
  });

})
}
