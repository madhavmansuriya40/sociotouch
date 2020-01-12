var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tbl_like_data = new Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'tbl_user_data'},
    post_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'tbl_user_post_data'},
});

module.exports = mongoose.model('tbl_like_data', tbl_like_data);