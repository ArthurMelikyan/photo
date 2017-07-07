var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connection.openUri('mongodb://127.0.0.1/users');
module.exports = db;