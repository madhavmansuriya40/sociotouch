var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var tbl_city_data = new Schema({
    city_id: {type:Number,required:true},
    city_name: {type:String,required:true},
    state_id: {type:Number,required:true}
});

module.exports = mongoose.model('tbl_city_data',tbl_city_data);