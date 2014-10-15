var OpenTok = require('opentok')

module.exports = function( app ) {

app.get('/', function( req, res ) {
    res.render('index.ejs')
})

app.get('/connect', function( req, res ) {

var opentok = new OpenTok( process.env.KEY, process.env.SECRET );
var sessionId = app.get('sessionId');
var token = opentok.generateToken(sessionId);

  res.render('connect.ejs', {
    apiKey: API[0],
    sessionId: sessionId,
    token: token
  });
 })
}
