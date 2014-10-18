var OpenTok = require('opentok')

module.exports = function( app ) {

app.get('/', function( req, res ) {

      res.render('pages/index')
})

app.get('/stream', function( req, res ) {

  var opentok = new OpenTok( process.env.KEY, process.env.SECRET );
  var sessionId = app.get('sessionId');
  var token = opentok.generateToken( sessionId );

    res.render('pages/stream', {
    apiKey: process.env.KEY,
    sessionId: sessionId,
    token: token
  });
 })
}

