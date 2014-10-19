var dotenv = require('dotenv')

  dotenv.load();

module.exports = {
    'URL': process.env.MONGO_URI
};