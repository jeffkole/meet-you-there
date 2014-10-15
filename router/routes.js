var OpenTok = require('opentok')
var url = require('url');
module.exports = function( app ) {

app.get('/', function( req, res ) {
    res.render('index.ejs')
})

app.get('/stream', function( req, res ) {

  var opentok = new OpenTok( process.env.KEY, process.env.SECRET );
  var sessionId = app.get('sessionId');
  var token = opentok.generateToken( sessionId );
  var getARoom = req.headers.referer + "stream/?room_id=" + sessionId;

  res.render('stream.ejs', {
    apiKey: process.env.KEY,
    sessionId: sessionId,
    token: token,
    getARoom: getARoom
  });
 })
}
