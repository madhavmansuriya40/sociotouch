var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tbl_msg_data = new Schema({
    sender_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'tbl_user_data' },
    reciver_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'tbl_user_data' },
    msg: { type: String },
    send_on: { type: Date },
    msf_status: { type: Number, default: 0 }
}, {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  });

module.exports = mongoose.model('tbl_msg_data', tbl_msg_data);