const Mongoose = require('mongoose'); // mengambil library mongo
Mongoose.connect('mongodb://localhost/belajarmongo'); // mengkoneksikan ke db mongo
module.exports = Mongoose; // export module Mongoose
