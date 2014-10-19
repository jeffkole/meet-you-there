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

mongoose.connect( database.URL );

/*  create new OpenTok instance */
var opentok = new OpenTok( process.env.KEY, process.env.SECRET );

/* create new OpenTok session, init server on session success */
opentok.createSession(function( err, session ) {
  if ( err ) throw err;
  app.set( 'sessionId', session.sessionId );

    startServer();
 });

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

mongoose.connection.on('connected', function () {
  console.log( 'Mongoose succesfully connected to : ' + database.URL );
});

/*  if the connection throws an error */
mongoose.connection.on('error',function (err) {
  console.log( 'Mongoose connection error : ' + err );
});

/*  when the connection is disconnected*/
mongoose.connection.on('disconnected', function () {
  console.log( 'Mongoose has disconnected' );
});

/*  If the Node process ends, close the Mongoose connection */
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log( 'Mongoose has disconnected through app termination' );
    process.exit( 0 );
  });
});

/* load routes, pass in configured app w passport and sessionId */
require('./router/routes.js')( app, passport );

function startServer() {
http.createServer( app ).listen( app.get( 'port' ), function(){
  console.log( 'Express server successfully listening on port : ' + app.get( 'port' ));
 });
}