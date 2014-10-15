var async = require('async');

module.exports = function( app ) {

    app.get('/', function( req, res ) {
        res.render('index.ejs');
    });
}
