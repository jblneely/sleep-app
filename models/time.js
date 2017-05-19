var mongoose = require('mongoose');

var sleepTime = mongoose.Schema({
    date: Date,
    hour: Number
});
module.exports = mongoose.model('time', sleepTime);
