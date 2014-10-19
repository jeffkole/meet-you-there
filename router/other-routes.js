var async = require('async');
var Bucket = require('./models/bucket.js');
var geocoder = require('geocoder');
var nodemailer = require('nodemailer');
var dotenv = require('dotenv');
    dotenv.load();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.sendFrom,
        pass: process.env.gmailPass
    }
});

module.exports = function( app, passport ) {

    // HOME SECTION
    app.get('/', function( req, res ) {
        res.render('index.ejs');
    });

    // PROFILE SECTION
    app.get('/profile', function( req, res ) {
        res.render('profile.ejs', req.user.local.email);
    });

    // QUERY DATABASE FOR LOGGED-IN USER BUCKETS
    app.post('/profile', function( req, res ) {
        Bucket.find({
            email: req.user.local.email
        }, function( err, docs ) {
            res.json(docs);
        });
    });
      // convert address to geo, then save results to db, then send user email, then redirect
  app.post('/success', function( req, res ) {
        async.waterfall(
            [
                function( callback ) {
                    geocoder.geocode(req.body.street + ', ' + req.body.city + ', ' + req.body.state + ', ' + req.body.zip,
                        function( err, data ) {
                            data.geoCodeResult = data;
                            callback( err, {geoCodeResult:data})
                        })
                },
                function( data, callback ) {
                    var newBucket = new Bucket({
                        email: req.user.local.email,
                        _isActive: false,
                        street: req.body.street,
                        city: req.body.city,
                        state: req.body.state,
                        zip: req.body.zip,
                        geoLat: data.geoCodeResult.results[0].geometry.location.lat,
                        geoLng: data.geoCodeResult.results[0].geometry.location.lng,
                        createdAt: new Date()
                    })
                    callback( null, newBucket );
                },
                function( newBucket, callback ) {
                    newBucket.save();
                    callback( null );
                },
                function( callback ) {
                    console.log('made it')
                    transporter.sendMail({
                        from: 'noreply@compology.com',
                        to: req.user.local.email,
                        subject: 'New Compology Bucket Added!',
                        html: "You've successfuly added a new bucket at " + req.body.street + ", " + req.body.city + ", " + req.body.state + ", " + req.body.zip + "."
                    }, function( err, response ) {
                        callback( err, response );
                    });
                }
            ],
            function( err, result ) {
                res.redirect('/profile');
                console.log( err || result );

            }
        )
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