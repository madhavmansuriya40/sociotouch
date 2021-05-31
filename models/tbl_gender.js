var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tbl_gender = new Schema({
    gen_id: { type: Number, required: true },
    name: { type: String, required: true }
}, {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  });

module.exports = mongoose.model('tbl_gender', tbl_gender);