var mongoose = require('mongoose');

var TaskSchema = mongoose.Schema({
    title: String,
    description: String,
    image: String
});
module.exports = mongoose.model('Task', TaskSchema);
