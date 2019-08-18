
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    id  : Number,
    name: String,
    amount: Number,
    description: String
});
module.exports = mongoose.model('product', ProductSchema);

