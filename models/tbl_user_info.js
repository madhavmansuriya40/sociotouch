var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tbl_user_info_data = new Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'tbl_user_data'},
    watch:{type:String},
    food:{type:String},
    place:{type:String},
    read:{type:String}
});

module.exports = mongoose.model('tbl_user_info_data', tbl_user_info_data);