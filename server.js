previousTime = Date.now();

var express      = require('express')
  , engine       = require('ejs-locals')
  , http         = require('http')
  , passport     = require('passport')
  , flash        = require('connect-flash')
  , path         = require('path')
  , OpenTok      = require('opentok')
  , morgan       = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser   = require('body-parser')
  , mongoose     = require('mongoose')
  , session      = require('express-session')
  , database     = require('./config/database.js')
  , dotenv       = require('dotenv')
  , app = express();
    dotenv.load();

/* pass passort to be configured */
require('./config/passport')( passport );

/*
  here we are passing a callback to the function that initializes OpenTok
  the callback will start the server.
  this initOpenTok function is called within the function body of the "database connected successfuly" event.
  this way, the app will initialize - after and based on - a successful database connection.
  at this point we are also injecting our configured app and passport object into the router.
*/

function initOpenTok ( callback ) {
/*  create new OpenTok instance */
var opentok = new OpenTok( process.env.KEY, process.env.SECRET );

/* create new OpenTok session, init server on session success */
opentok.createSession(function( err, session ) {
  if ( err ) throw err;
  app.set( 'sessionId', session.sessionId );

  /* load routes, pass in configured app with passport  */
  require('./router/routes.js')( app, passport );

    callback();
 });
}

/* Settings For The Instance of The Express App */

app.engine( 'ejs', engine );
app.set( 'view engine', 'ejs' );
app.set( 'port', process.env.PORT || 3000 );
app.use( express.static( __dirname + '/public') );

/* set joint path for js and css, add support for bodyparser */
app.use( express.static( path.join(__dirname, 'public') ));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use( morgan('dev') );
app.use( cookieParser() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ));

/* set passport dependencies on app */
app.use( session({
    secret: 'cookie_secret',
    name: 'cookie_name',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

app.use( passport.initialize() );
app.use( passport.session() );
app.use( flash() );


/* Database Connection Events */

mongoose.connect( database.URL );

mongoose.connection.on('connected', function () {
  console.log( 'Mongoose succesfully connected to : ' + database.URL );
  console.log( 'Now initializing TokBox session and the Express Server.' );
    initOpenTok( startServer );
});

/*  if the connection throws an error */
mongoose.connection.on('error',function (err) {
  console.log( 'Mongoose connection error : ' + err );
});

/*  when the connection is disconnected*/
mongoose.connection.on('disconnected', function () {
  console.log( 'Mongoose has disconnected' );
});

/*  if the Node process ends, close the Mongoose connection */
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log( 'Mongoose has disconnected through app termination' );
    process.exit( 0 );
  });
});

function startServer() {
http.createServer( app ).listen( app.get( 'port' ), function(){
  console.log( 'Express server successfully listening on port : ' + app.get( 'port' ) );
  console.log( 'Total connection time : ' + ( -( previousTime - Date.now() ) ) + 'ms' );
  });
}