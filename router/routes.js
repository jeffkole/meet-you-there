var OpenTok = require('opentok')
 ,  shorturl = require('shorturl');

module.exports = function( app ) {

app.get('/', function( req, res ) {
    res.render('index.ejs')
})

app.get('/stream', function( req, res ) {

  var opentok = new OpenTok( process.env.KEY, process.env.SECRET );
  var sessionId = app.get('sessionId');
  var token = opentok.generateToken( sessionId );
      shorturl( req.headers.referer + "stream/?room_id=" + sessionId, function( result ) {
      render( result )
});
      function render( result ) {
  res.render('stream.ejs', {
    apiKey: process.env.KEY,
    sessionId: sessionId,
    token: token,
    getARoom: result
  });
}

 })
}
