var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tbl_user_data = new Schema({
    user_img_path: {type: String, required: true},
    user_cover_path: {type: String, required: true},
    user_fname: {type: String, required: true},
    user_lname: {type: String, required: true},
    user_uname: {type: String, required: true, unique: true},
    user_bdate: {type: String, required: true},
    user_gender: {type: String, required: true},
    user_contact: {type: String, required: true},
    user_email: {type: String, required: true, unique: true},
    user_state: {type: String, required: true},
    user_city: {type: String, required: true},
    user_password: {type: String, required: true},
    user_account_status: {type: String, required: true, default: '0'},
});

module.exports = mongoose.model('tbl_user_data', tbl_user_data);