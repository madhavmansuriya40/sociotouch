var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tbl_friend_request_data = new Schema({
    req_from: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'tbl_user_data'},
    req_to: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'tbl_user_data'},
    request_status: {type: String},
    created_at: {type: Date},
    updated_at: {type: Date},
    request_delete_status: {type: Number}
});

module.exports = mongoose.model('tbl_friend_request_data', tbl_friend_request_data);