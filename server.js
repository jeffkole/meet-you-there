var express = require('express')
  , http = require('http')
  , OpenTok = require('opentok')
  , path = require('path')
  , morgan       = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser   = require('body-parser')
  , dotenv = require('dotenv')
  , app = express();
    dotenv.load();

// create new OpenTok instance
var opentok = new OpenTok( process.env.KEY, process.env.SECRET );

// create new OpenTok session, init server on session-success
opentok.createSession(function( err, session ) {
  if ( err ) throw err;
  app.set( 'sessionId', session.sessionId );
  callback();
});

// set port, template engine
app.set('view engine', 'ejs');
app.set( 'port', process.env.PORT || 3000 );
app.use(express.static(__dirname + '/public'));

// set joint path for js and css, add support for bodyparser
app.use( express.static( path.join(__dirname, 'public') ));
app.use( morgan('dev') ); // logs requests to the console
app.use( cookieParser() ); // read cookies ( auth )
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ));

require('./router/routes.js')( app ); // load routes, pass in configured app ( w sessionId )

function callback() {
http.createServer( app ).listen( app.get( 'port' ), function(){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
});
}

function standardSetup(request, response, type){
  response.setHeader('Content-Type', 'text/html');
  gv.getSessionIdAndToken(request, response, function(response, sessionId, token){
    response.render('index_'+type, {
      layout: 'layout_'+type,
      locals: {
        url: gv.urlToCopy(sessionId, type),
        token: token,
        sessionId: sessionId
      }
    });
    response.end();
  });
}