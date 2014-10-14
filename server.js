var express = require('express'),
    OpenTok = require('opentok'),
    dotenv = require('dotenv')
    dotenv.load()


// Verify that the API Key and API Secret are defined
var apiKey = process.env.KEY,
    apiSecret = process.env.SECRET;
if (!apiKey || !apiSecret) {
  console.log('You must specify API_KEY and API_SECRET environment variables');
  process.exit(1);
}

var app = express();
app.use(express.static(__dirname + '/public'));

var opentok = new OpenTok(apiKey, apiSecret);

opentok.createSession(function(err, session) {
  if (err) throw err;
  app.set('sessionId', session.sessionId);
  init();
});

app.get('/', function(req, res) {
  var sessionId = app.get('sessionId'),
      // generate a fresh token for this client
      token = opentok.generateToken(sessionId);

  res.render('index.ejs', {
    apiKey: apiKey,
    sessionId: sessionId,
    token: token
  });
});

// Start the express app
function init() {
  app.listen(3000, function() {
    console.log('You\'re app is now ready at http://localhost:3000/');
  });
}