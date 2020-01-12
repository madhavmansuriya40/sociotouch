var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tbl_state = new Schema({
    id: {type:Number,required:true},
    name: {type:String,required:true}
});

module.exports = mongoose.model('tbl_state',tbl_state);