var mongoose = require('mongoose');

var sleepTime = mongoose.Schema({
    date: String,
    hour: integer,
    minute: integer
});
module.exports = mongoose.model('time', sleepTime);
