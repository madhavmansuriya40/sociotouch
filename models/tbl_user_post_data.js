var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tbl_user_post_data = new Schema({
    user_post_media_path:{type: String},
    user_post_caption:{type: String},
    user_post_user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'tbl_user_data'},
    user_post_created_at:{type: Date},
    user_post_updated_at:{type: Date},
    user_post_tags:{type: String},
    user_post_tags_positions:{type: String},
    user_post_loc_place:{type: String},
    user_post_loc_id:{type: String},
    user_post_caption_bg_path:{type: String},
    user_post_media_ext:{type: String},
    user_post_media_delete_status:{type: String},
    user_post_media_hide_status:{type: String},
    user_post_media_update_status:{type: String}
});

module.exports = mongoose.model('tbl_user_post_data',tbl_user_post_data);