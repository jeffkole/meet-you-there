var OpenTok = require('opentok')
var dotenv = require('dotenv');
    dotenv.load();


module.exports = function( app, passport ) {


    // var opentok = new OpenTok( process.env.KEY, process.env.SECRET );
    // var sessionId = app.get('sessionId');
    // var token = opentok.generateToken( sessionId );


    app.get('/', function( req, res ) {
       res.render('index.ejs')
        //     apiKey: process.env.KEY,
        //     sessionId: sessionId,
        //     token: token
        // });
    });


    app.get('/profile', function( req, res ) {
              var opentok = new OpenTok( process.env.KEY, process.env.SECRET );
    var sessionId = app.get('sessionId');
    var token = opentok.generateToken( sessionId );

          res.render('profile.ejs', {
            apiKey: process.env.KEY,
            sessionId: sessionId,
            token: token
        });
  });


    // LOGOUT
    app.get('/logout', function( req, res ) {
        req.logout();
        res.redirect('/');
    });

    // RENDER LOGIN FORM
    app.get('/login', function( req, res ) {
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    // PROCESS LOGIN FORM
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // RENDER SIGNUP FORM
    app.get('/signup', function( req, res ) {
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });

    // PROCESS SIGNUP FORM
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));




    app.get('/connect/local', function( req, res ) {
        res.render('connect-local.ejs', {
            message: req.flash('loginMessage')
        });
    });

    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // LOCAL
    app.get('/unlink/local', isLoggedIn, function( req, res ) {
        var user = req.user;
        user.local.email = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });
};

// ROUTE MIDDLEWARE TO ENSURE THE USER IS LOGGED IN
function isLoggedIn( req, res, next ) {
    if ( req.isAuthenticated() )
        return next();

    res.redirect('/');
}