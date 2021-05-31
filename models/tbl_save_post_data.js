var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tbl_save_post_data = new Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'tbl_user_data'},
    post_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'tbl_user_post_data'},
    saved_on: {type: Date},
}, {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  });

module.exports = mongoose.model('tbl_save_post_data', tbl_save_post_data);