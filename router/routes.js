var OpenTok = require('opentok')
 ,  shorturl = require('shorturl')

module.exports = function( app ) {

app.get('/', function( req, res ) {

      res.render('pages/index')
})

app.get('/stream', function( req, res ) {

  var opentok = new OpenTok( process.env.KEY, process.env.SECRET );
  var sessionId = app.get('sessionId');
  var token = opentok.generateToken( sessionId );
      shorturl( req.headers.referer + "stream/?room_id=" + sessionId, function( result ) {
      renderAuth( result )
});

  function renderAuth( result ) {
    res.render('pages/stream', {
    apiKey: process.env.KEY,
    sessionId: sessionId,
    token: token,
    getARoom: result
  });
  }
 })

app.get('/reservations', function( req, res ) {
  res.render('pages/reservations')

  });
}
