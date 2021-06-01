var express = require('express');
var router = express.Router();
var session = require('express-session'); // session package
var jwt = require('jsonwebtoken');
// const axios = require('axios');

var http = require('http').Server(express);
var io = require('socket.io')(http);

var bcryptjs = require('bcryptjs');// to encrypt the text
var multer = require('multer'); // to upload files
var path = require('path'); // tp direct the path to save files
var fs = require('fs'); // managing file system
var async = require('async');
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars'); // mail package to render html
const checkAuth = require('../middleware/check_auth');


// model used in index routing for gethering data start//

var tbl_state = require('../models/tbl_state');
var tbl_city_data = require('../models/tbl_city_data');
var tbl_user = require('../models/tbl_user_data');
var tbl_gender = require('../models/tbl_gender');
var tbl_user_post = require('../models/tbl_user_post_data');
var tbl_frnd_req = require('../models/tbl_friend_requst_data');
var tbl_save_post = require('../models/tbl_save_post_data');
var tbl_msg = require('../models/tbl_msg_data');
var tbl_like = require('../models/tbl_like_data');
var tbl_user_info = require('../models/tbl_user_info');

// model used in index routing for gethering data ends//

//---------------       Mongodb collection   start   --------------------------
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://127.0.0.1:27017/";
//
// var dbo = "";
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     dbo = db.db("mydb");
// });
//---------------       Mongodb collection   over   --------------------------
//--------------------------------------------------------------------

//----------------      Global Declaration start    ------------------
var arr_friend_detail = new Array();
var arr_user_post = new Array();
var users = [];
var onlineuser = [];
//----------------      Global Declaration over    ------------------

//----------mail settings------------------
var mailer = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '465',
    secure: true,
    auth: {
        user: 'sociotouch.info@gmail.com',
        pass: 'Passcode#40'
    }
});

mailer.use('compile', hbs({
    viewPath: 'views/email',
    extName: '.hbs'
}));
//----------mail settings over------------------

$arr_img_path = Array();
$arr_img_ext = Array();
const storage = multer.diskStorage({
    destination: './public/images/user_post_media/',
    filename: function (req, file, cb) {
        var file = file.fieldname + '-' + Date.now() + "-" + session.user_id + path.extname(file.originalname);
        $arr_img_path.push('/images/user_post_media/' + file);
        cb(null, file);
    }
});

const upload = multer({
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
    storage: storage
}).array('file', 10);

function checkFileType(file, cb) {
    // list of allowed extension
    const filetypes = /jpeg|jpg|gif|png|svg|mp4|mp3|mov/;

    // check extention
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    $arr_img_ext.push(extname);
    // check mime tyoe
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        // fs.unlink
        cb("Error : Images Only!!!");
    }
}


//---------------       Socket start      --------------------------

// io.on('connection', function(socket){
//     console.log('a user connected');
//     socket.on('disconnect', function(){
//         console.log('user disconnected');
//     });
// });

// ---------------       Socket Over      --------------------------

/* GET users listing. */


router.get('/search/:uname', checkAuth, function (req, res, next) {
    console.log("search user  method called");
    var user_id = "";
    var search_name = req.params.uname;
    tbl_user.find({user_uname: search_name}, {
        user_img_path: 1,
        user_cover_path: 1,
        user_fname: 1,
        user_lname: 1,
        user_uname: 1,
        user_bdate: 1,
    }).exec().then(search_user_info => {
        tbl_user.find({user_uname: session.user_name}, {
            user_img_path: 1,
            user_cover_path: 1,
            user_fname: 1,
            user_lname: 1,
            user_uname: 1,
            user_bdate: 1,
        }).exec().then(user_info => {
            search_user_info.forEach(data => {
                user_id = data._id;
            });
            tbl_user_post.find({
                user_post_user_id: user_id,
                user_post_media_delete_status: "0",
                user_post_media_hide_status: "0"
            })
                .exec()
                .then(searched_users_post => {
                    //console.log(searched_users_post);
                    res.render('user/search_profile', {
                        title: search_name + '\'s | Profile',
                        user_info: user_info,
                        search_user_info: search_user_info,
                        searched_users_post: searched_users_post,
                    });
                }).catch(err => {
                "searched_users_post_err = " + err
            });
        }).catch(err => {
            console.log(err);
        });

    }).catch(err => {
        console.log(err);
    });
});

router.post('/get_searched_user_profile', checkAuth, function (req, res, next) {
    var searched_id = req.body.searched_user_id;
    console.log("req check id = " + searched_id);
    if (searched_id == session.user_id) {
        res.send('self');
    }
    else {
        tbl_user.find({_id: searched_id})
            .exec()
            .then(searched_user_info => {
                tbl_user_post.find({
                    user_post_user_id: searched_id,
                    user_post_media_delete_status: "0",
                    user_post_media_hide_status: "0"
                }).sort({user_post_created_at: -1})
                    .exec()
                    .then(searched_user_post_detail => {
                        tbl_frnd_req.find({
                            $or: [{req_from: session.user_id, req_to: searched_id}, {
                                req_from: searched_id,
                                req_to: session.user_id
                            }],
                            $and: [{request_delete_status: 0}]
                        })
                            .exec()
                            .then(request_data => {
                                console.log("request_dat = " + request_data);
                                if (request_data.length != 0) {
                                    console.log("sending from if");
                                    request_data.forEach(req_status => {
                                        if (req_status.request_status == "requested") {
                                            if (req_status.req_from == session.user_id) {
                                                res.send({
                                                    searched_user_info: searched_user_info,
                                                    // searched_user_post_detail: searched_user_post_detail,
                                                    request_data: 'sent'
                                                });
                                            }
                                            if (req_status.req_from != session.user_id) {
                                                res.send({
                                                    searched_user_info: searched_user_info,
                                                    // searched_user_post_detail: searched_user_post_detail,
                                                    request_data: 'accept'
                                                });
                                            }

                                        }
                                        if (req_status.request_status == "accepted") {
                                            res.send({
                                                searched_user_info: searched_user_info,
                                                searched_user_post_detail: searched_user_post_detail,
                                                request_data: 'unfriend'
                                            });
                                        }
                                        if (req_status.request_status == "block") {
                                            res.send('block');
                                        }
                                    });
                                }
                                else {
                                    console.log("sending from else");
                                    res.send({
                                        searched_user_info: searched_user_info,
                                        //searched_user_post_detail: searched_user_post_detail,
                                        request_data: 'add_friend'
                                    });
                                }

                            })
                            .catch(req_err => {
                                console.log("error in search req detail = " + req_err);
                            });
                    })
                    .catch(err => {
                        console.log("error in search user post detail = " + err);
                    })
            })
            .catch(err => {
                console.log("error in search user detail = " + err);
            });
    }

});

router.get('/home', checkAuth, function (req, res, next) {
    console.log("home method called");
    tbl_user.find({user_uname: session.user_name}, {
        user_img_path: 1,
        user_cover_path: 1,
        user_fname: 1,
        user_lname: 1,
        user_uname: 1,
        user_bdate: 1,
    }).exec().then(user_info => {
        tbl_frnd_req.count({
            $or: [{req_from: session.user_id}, {req_to: session.user_id}],
            $and: [{request_status: "accepted"}]
        }).exec()
            .then(get_friends => {
                res.render('user/user_home', {
                    title: session.user_name + '\'s | Home',
                    user_info: user_info,
                    get_friends: get_friends
                })
            })
            .catch(err => {

            })
    }).catch(err => {
        console.log(err);
    });
});

// async function get_frnd_post(frnd_dets) {
//     console.log("in Method");
//     let promise = new Promise((resolve, reject) => {
//         var i = 0;
//         async.forEach(frnd_dets, function process(get_user_posts, next) {
//             //console.log("in async for");
//             for (var i = 0; i < get_user_posts.length; i++) {
//                 tbl_user_post.find({user_post_user_id: get_user_posts[i]._id})
//                     .sort({user_post_created_at: -1})
//                     .exec()
//                     .then(frnd_post => {
//                         arr_user_post.push(frnd_post);
//                         console.log("frnd_post_arr = " + arr_user_post);
//                         next();
//                     })
//                     .catch(err => {
//                         console.log("ererrrrrr = " + err);
//                     })
//             }
//         }, function allTaskDone() {
//             console.log("++++++");
//             // console.log("arr_friend_detail_print = " + arr_friend_detail);
//             resolve(arr_user_post);
//         });
//     });
//     console.log("000");
//     let user_post_datas = await promise;
//     console.log("222");
//     return user_post_datas;
// }
//
// async function get_frnd_det(get_friends) {
//     let promise = new Promise((resolve, reject) => {
//         var i = 0;
//         async.forEach(get_friends, function process(get_user_data, next) {
//             if (get_user_data.req_from != session.user_id) {
//                 tbl_user.find({_id: get_user_data.req_from})
//                     .exec()
//                     .then(user_data => {
//                         //console.log("pushing user_data if= " + user_data);
//                         arr_friend_detail.push(user_data);
//                         //get_frnd_post(user_data);
//                         next();
//
//                     })
//                     .catch(user_get_err => {
//                         console.log("user_get_err = " + user_get_err);
//                     });
//             }
//             else {
//                 tbl_user.find({_id: get_user_data.req_to})
//                     .exec()
//                     .then(user_data => {
//                         //console.log("pushing user_data else= " + user_data);
//                         arr_friend_detail.push(user_data);
//                         //get_frnd_post(user_data);
//                         next();
//                     })
//                     .catch(user_get_err => {
//                         console.log("user_get_err = " + user_get_err);
//                     });
//             }
//         }, function allDone() {
//             // console.log("arr_friend_detail_print = " + arr_friend_detail);
//             resolve(arr_friend_detail);
//         });
//     });
//     let result = await promise;
//     return result;
// }

router.post('/get_posts_all_frnd', function (req, resu, next) {
    // arr_friend_detail = [''];
    //
    // tbl_frnd_req.find({
    //     $or: [{req_from: session.user_id}, {req_to: session.user_id}],
    //     $and: [{request_status: "accepted"}]
    // }).exec()
    //     .then(get_friends => {
    //         //console.log("get_friends arr = " + get_friends);
    //         get_frnd_det(get_friends).then(result => {
    //             //console.log("new res var = " + result);
    //             get_frnd_post(result).then(user_post_datas => {
    //                 // console.log("Method called check -1 ");
    //                 console.log("Final post data = " + user_post_datas);
    //             }).catch(err => {
    //
    //             })
    //         }).catch(err => {
    //
    //         });
    //     })
    //     .catch(fetch_frnd_err => {
    //         console.log("fetch_frnd_err = " + fetch_frnd_err);
    //     });
    // db.tbl_user.aggregate([
    //     {
    //         $lookup:
    //             {
    //                 from: "tbl_user_post",
    //                 localField: "_id",
    //                 foreignField: "user_post_user_id",
    //                 as: "data"
    //             }
    //     }
    // ]).toArray(function(err, res) {
    //     if (err) throw err;
    //     console.log(JSON.stringify(res));
    //     db.close();
    // });

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://madhav:<madmax>@cluster0-s9imw.mongodb.net/test";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("SocioTouch");
        dbo.collection('tbl_user_datas').aggregate([
            {
                $lookup:
                    {
                        from: 'tbl_friend_request_datas',
                        localField: 'req_from',
                        foreignField: '_id',
                        as: 'post_data'
                    }
            },{
            $unwind:"$post_data"
            },{
                $lookup:
                    {
                        from: 'tbl_user_post_datas',
                        localField: 'user_post_user_id',
                        foreignField: '_id',
                        as: 'final_data'
                    }
            }
        ]).toArray(function (err, res) {
            if (err) throw err;
            console.log("result is = " + res);
            resu.send(JSON.stringify(res));
            db.close();
        });
    });
});

router.get('/myprofile', checkAuth, function (req, res, next) {

    console.log("my profile method called");
    tbl_user.find({user_uname: session.user_name}, {
        user_img_path: 1,
        user_cover_path: 1,
        user_fname: 1,
        user_lname: 1,
        user_uname: 1,
        user_bdate: 1,
    }).exec().then(user_info => {

        tbl_user_post.find({user_post_user_id: session.user_id}).exec().then(user_post_info => {

            res.render('user/user_profile', {
                title: session.user_name + '\'s | Profile',
                user_info: user_info,
                user_post_info: user_post_info
            });
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    });
});

router.get('/chatroom', checkAuth, function (req, res, next) {
    tbl_user.find({user_uname: session.user_name}, {
        user_img_path: 1,
        user_cover_path: 1,
        user_fname: 1,
        user_lname: 1,
        user_uname: 1,
        user_bdate: 1,
    }).exec().then(user_info => {
        res.render('user/chatroom', {
            title: session.user_name + '\'s | Chat Room',
            user_info: user_info,
        });
    }).catch(err => {
        console.log(err);
    });
});

router.post('/get_users_from_tags', checkAuth, function (req, res, next) {
    console.log("get user from tags");
    var user_array = new Array();
    var tags = req.body.user_tag_array;
    if (tags.length != 0) {
        var tags = tags.split(',');
        console.log("in if");
        console.log("user_array = " + tags);
        async.tags.forEach(get_users => {
            console.log("finding single user - " + get_users);
            tbl_user.find({_id: get_users}, {'user_uname': 1})
                .exec()
                .then(user_name => {
                    user_array.push(user_name);
                    console.log("printing array = " + user_array);
                }).catch(err => {
                console.log("user fetch error = " + err);
            });
        });
        console.log("user array is = " + user_array);
        res.send(user_array);

    }
    else {
        res.send('');
    }
    // console.log("got tags = " + tags);
});

router.post('/ajaxmyprofile', checkAuth, function (req, res, next) {
    console.log("ajax get profile");
    tbl_user.find({user_uname: session.user_name}, {
        user_img_path: 1,
        user_cover_path: 1,
        user_fname: 1,
        user_lname: 1,
        user_uname: 1,
        user_bdate: 1,
    }).exec().then(user_info => {

        tbl_user_post.find({
            user_post_user_id: session.user_id, user_post_media_delete_status: '0'
        }).sort({user_post_created_at: -1})
            .exec()
            .then(user_post_info => {
                res.send({
                    user_info: user_info,
                    user_post_info: user_post_info
                });
            }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    });
});

router.post('/get_post_more_images', checkAuth, function (req, res, next) {

    tbl_user_post.find({_id: req.body.selected_post_id})
        .populate('user_post_user_id')
        .exec(function (err, user_and_post_data) {
            if (err) {
                console.log("err = " + err);
            }
            else {
                res.send(user_and_post_data);
                console.log("story  = " + user_and_post_data);
            }
        });
});

router.post('/search_user', checkAuth, function (req, res, next) {
    console.log("internal search user method called method called");
    var search_data = req.body.search_data;
    console.log(search_data);
    tbl_user.find({
        $or: [{user_uname: {$regex: search_data}}, {user_fname: {$regex: search_data}}, {user_lname: {$regex: search_data}}]
    }, {
        user_img_path: 1,
        user_fname: 1,
        user_lname: 1,
        user_uname: 1,
    }).exec().then(search_data_ans => {
        res.send({search_data_ans: search_data_ans});
    }).catch(err => {
        console.log(err);
    });
});

router.post('/upload_caption_post', checkAuth, function (req, res, next) {

    if (!(session.user_name == "" || session.user_name == undefined)) {


        post_data = new tbl_user_post();

        post_data.user_post_caption = req.body.caption;
        post_data.user_post_user_id = session.user_id;
        post_data.user_post_created_at = new Date();
        post_data.user_post_updated_at = new Date();
        post_data.user_post_caption_bg_path = req.body.background;
        post_data.user_post_tags = req.body.tags;
        post_data.user_post_loc_place = req.body.place_name;
        post_data.user_post_loc_id = req.body.loc_id;
        post_data.user_post_media_path = req.body.media_path;
        post_data.user_post_media_delete_status = '0';
        post_data.user_post_media_hide_status = '0';
        post_data.user_post_media_update_status = '0';

        post_data.save((err, doc) => {
            if (err) {
                console.log(err);
                res.send("Error posting");
            }
            else {
                res.send("posted");
            }
        });
    }
    else {
        res.send("home");
    }
});

router.post('/upload_multi_caption_post', function (req, res, next) {


    upload(req, res, (err) => {
        if (err) {
            console.log("all files are required");
            res.send('upload_error');
        }
        else {

            var str_path_of_image = $arr_img_path;
            var str_media_ext = $arr_img_ext;
            post_data = new tbl_user_post();

            post_data.user_post_caption = req.body.caption;
            post_data.user_post_user_id = session.user_id;
            post_data.user_post_created_at = new Date();
            post_data.user_post_updated_at = new Date();
            post_data.user_post_caption_bg_path = req.body.background;
            post_data.user_post_tags = req.body.tags;
            post_data.user_post_loc_place = req.body.place_name;
            post_data.user_post_loc_id = req.body.loc_id;
            post_data.user_post_media_path = str_path_of_image;
            post_data.user_post_media_ext = str_media_ext;
            post_data.user_post_media_delete_status = '0';
            post_data.user_post_media_hide_status = '0';
            post_data.user_post_media_update_status = '0';

            post_data.save((err, doc) => {
                if (err) {
                    console.log("hello dude thers an error = " + err);
                }
                else {
                    console.log("its ok will do it");
                }
            });
            console.log("done");
            $arr_img_path = [];
            res.send('uploaded');

        }
    });
});

router.post('/delete_user_post', checkAuth, function (req, res, next) {
    tbl_user_post.update({_id: req.body.id}, {'user_post_media_delete_status': '1'})
        .exec()
        .then(update_status => {
            res.send("del_success");
        })
        .catch(err => {
            console.log("Error =" + err);
        })
});

router.post('/add_friend', checkAuth, function (req, res, next) {
    console.log('us_id = ' + session.user_id);
    console.log('req_id = ' + req.body.frnd_id);
    tbl_frnd_req.find({
        $or: [{req_from: session.user_id, req_to: req.body.frnd_id}, {
            req_from: req.body.frnd_id,
            req_to: session.user_id
        }],
        $and: [{request_delete_status: 0}]
    })
        .exec()
        .then(frnd_req_stts => {
            console.log("frnd_req_status = " + frnd_req_stts.length);
            if (frnd_req_stts.length == 0) {
                frnd_req = new tbl_frnd_req();

                frnd_req.req_from = session.user_id;
                frnd_req.req_to = req.body.frnd_id;
                frnd_req.request_status = 'requested';
                frnd_req.created_at = new Date();
                frnd_req.updated_at = new Date();
                frnd_req.request_delete_status = 0;

                frnd_req.save((err, doc) => {
                    if (err) {
                        console.log("req insert error  = " + err);
                    }
                    else {
                        console.log("done now inserting req");
                        res.send('sent');
                    }
                });
            }
            else {
                res.send('requested');
            }
        })
        .catch(err => {
            console.log("error in frnd req = " + err)
        });


});

router.post('/accept_req', checkAuth, function (req, res, next) {
    var acept_req = req.body.accept_id;
    tbl_frnd_req.update({req_from: acept_req, req_to: session.user_id}, {request_status: "accepted"})
        .exec()
        .then(acept_updt_status => {
            res.send('accepted');
        })
        .catch(accpt_err => {
            console.log("error in accepting request = " + accpt_err);
        });

});

router.post('/cancel_req', checkAuth, function (req, res, next) {
    var cancel_req_id = req.body.cancel_req_id;
    tbl_frnd_req.remove({req_from: session.user_id, req_to: cancel_req_id})
        .exec()
        .then(delete_status => {
            console.log("req delete status = " + delete_status);
            res.send('canceled');
        })
        .catch(del_err => {
            console.log("req delete error =" + del_err);
        });
});

router.post('/delete_req', checkAuth, function (req, res, next) {
    var cancel_req_id = req.body.cancel_req_id;
    tbl_frnd_req.remove({req_from: cancel_req_id, req_to: session.user_id})
        .exec()
        .then(delete_status => {
            console.log("req delete status = " + delete_status);
            res.send('canceled');
        })
        .catch(del_err => {
            console.log("req delete error =" + del_err);
        });
});

router.post('/unfriend_user', checkAuth, function (req, res, next) {
    var unfriend_id = req.body.unfrnd_id;
    tbl_frnd_req.remove({
        $or: [{req_from: session.user_id, req_to: unfriend_id}, {
            req_from: unfriend_id,
            req_to: session.user_id
        }],
    })
        .exec()
        .then(delete_status => {
            console.log("req delete status = " + delete_status);
            res.send('unfriended');
        })
        .catch(del_err => {
            console.log("req delete error =" + del_err);
        });
});

router.post('/save_post', checkAuth, function (req, res, next) {
    var save_id = req.body.post_id;

    tbl_save_post.find({post_id: save_id, user_id: session.user_id})
        .exec()
        .then(saved_post_status => {
            if (saved_post_status.length == 0) {
                tbl_save_pst = new tbl_save_post();

                tbl_save_pst.user_id = session.user_id;
                tbl_save_pst.post_id = save_id;
                tbl_save_pst.saved_on = new Date();

                tbl_save_pst.save((err, doc) => {
                    if (err) {
                        console.log("save post saving error = " + err);
                    }
                    else {
                        console.log(doc);
                        res.send("saved");
                    }
                })
            }
            else {
                tbl_save_post.remove({post_id: save_id, user_id: session.user_id})
                    .exec()
                    .then(dele_saved_rec => {
                        res.send("un_saved");
                    })
                    .catch(dele_saved_rec_err => {
                        res.send("error");
                    });
            }
        })
        .catch(saved_post_err => {
            console.log("saved_post_err = " + saved_post_err);
        });


});

router.post('/like_post', checkAuth, function (req, res, next) {
    var like_id = req.body.post_id;

    tbl_like.find({post_id: like_id, user_id: session.user_id})
        .exec()
        .then(liked_post_status => {
            if (liked_post_status.length == 0) {
                tbl_like_data = new tbl_like();

                tbl_like_data.user_id = session.user_id;
                tbl_like_data.post_id = like_id;

                tbl_like_data.save((err, doc) => {
                    if (err) {
                        console.log("like post saving error = " + err);
                    }
                    else {
                        console.log(doc);
                        res.send("liked");
                    }
                })
            }
            else {
                tbl_like.remove({post_id: like_id, user_id: session.user_id})
                    .exec()
                    .then(dele_saved_rec => {
                        res.send("un_liked");
                    })
                    .catch(dele_saved_rec_err => {
                        res.send("error");
                    });
            }
        })
        .catch(saved_post_err => {
            console.log("saved_post_err = " + saved_post_err);
        });


});

async function frn_details(get_friends) {
    // console.log(gameIdAry);
    let promise = new Promise((resolve, reject) => {
        var i = 0;
        async.forEach(get_friends, function process(get_user_data, next) {
            if (get_user_data.req_from != session.user_id) {
                tbl_user.find({_id: get_user_data.req_from})
                    .exec()
                    .then(user_data => {
                        console.log("pushing user_data if= " + user_data);
                        arr_friend_detail.push(user_data);
                        next();

                    })
                    .catch(user_get_err => {
                        console.log("user_get_err = " + user_get_err);
                    });
            }
            else {
                tbl_user.find({_id: get_user_data.req_to})
                    .exec()
                    .then(user_data => {
                        console.log("pushing user_data else= " + user_data);
                        arr_friend_detail.push(user_data);
                        next();
                    })
                    .catch(user_get_err => {
                        console.log("user_get_err = " + user_get_err);
                    });
            }
        }, function allDone() {
            console.log("arr_friend_detail_print = " + arr_friend_detail);
            resolve(arr_friend_detail);
        });
    });
    let result = await promise;
    return result;
}

router.post('/get_friends', checkAuth, function (req, res, next) {

    arr_friend_detail = [''];

    tbl_frnd_req.find({
        $or: [{req_from: session.user_id}, {req_to: session.user_id}],
        $and: [{request_status: "accepted"}]
    }).exec()
        .then(get_friends => {
            console.log("get_friends arr = " + get_friends);
            frn_details(get_friends).then(result => {
                res.send(result);
            }).catch(err => {

            });
        })
        .catch(fetch_frnd_err => {
            console.log("fetch_frnd_err = " + fetch_frnd_err);
        });
});

router.post('/get_chat_user_details', checkAuth, function (req, res, nex) {
    var chat_req_id = req.body.chat_user_id;
    // console.log("id to find is = " + chat_req_id);
    tbl_user.find({_id: chat_req_id})
        .exec()
        .then(user_data => {
            tbl_msg.find({
                $or: [{sender_id: session.user_id, reciver_id: chat_req_id}, {
                    sender_id: chat_req_id,
                    reciver_id: session.user_id
                }]
            }).exec()
                .then(user_msgs => {
                    console.log(user_msgs);
                    res.send({
                        user_msgs: user_msgs,
                        user_data: user_data
                    });
                }).catch(err_msgs => {
                console.log("msg fetch err = " + err_msgs);
            });
        })
        .catch(user_fetch_err => {
            console.log("error in user finding = " + user_fetch_err);
        });
});

router.post('/get_messages', checkAuth, function (req, res, next) {
    console.log("get post called");
    var chat_req_id = req.body.chat_user_id;
    tbl_msg.find({
        $or: [{sender_id: session.user_id, reciver_id: chat_req_id}, {
            sender_id: chat_req_id,
            reciver_id: session.user_id
        }]
    }).exec()
        .then(user_msgs => {
            console.log(user_msgs);
            res.send({
                user_msgs: user_msgs
            });
        }).catch(err_msgs => {
        console.log("msg fetch err = " + err_msgs);
    });
});

router.post('/send_message', checkAuth, function (req, res, next) {
    var msg = req.body.caption;
    var recpt_usr = req.body.recpt_id;

    msg_data = new tbl_msg();

    msg_data.sender_id = session.user_id;
    msg_data.reciver_id = recpt_usr;
    msg_data.msg = msg;
    msg_data.send_on = new Date();

    msg_data.save((err, doc) => {
        if (err) {
            console.log(err);
            res.send("Error sending = " + err);
        }
        else {
            io.emit('message', msg);
            res.send("sent");
        }
    });
});

router.get('/group', checkAuth, function (req, res, next) {
    tbl_user.find({user_uname: session.user_name}, {
        user_img_path: 1,
        user_cover_path: 1,
        user_fname: 1,
        user_lname: 1,
        user_uname: 1,
        user_bdate: 1,
    }).exec().then(user_info => {
        res.render('user/new_grp', {
            title: session.user_name + '\'s | Groups',
            user_info: user_info,
        })
    }).catch(err => {
        console.log(err);
    });
});

router.post('/get_saved', checkAuth, function (req, res, next) {
    var usr_id = session.user_id;
    tbl_save_post.find({user_id: usr_id})
        .exec()
        .then(saved_post => {
            saved_post.forEach(post_data => {
                tbl_user_post.find({_id: post_data.post_id})
                    .then(posts => {
                        res.send(posts);
                    }).catch(post_err => {

                })
            });
        }).catch(save_err => {

    });
});

router.get('/saved', checkAuth, function (req, res, next) {
    tbl_user.find({user_uname: session.user_name}, {
        user_img_path: 1,
        user_cover_path: 1,
        user_fname: 1,
        user_lname: 1,
        user_uname: 1,
        user_bdate: 1,
    }).exec().then(user_info => {
        res.render('user/saves', {
            title: session.user_name + '\'s | Saves',
            user_info: user_info,
        })
    }).catch(err => {
        console.log(err);
    });
});

router.get('/request', checkAuth, function (req, res, next) {

    tbl_user.find({user_uname: session.user_name}, {
        user_img_path: 1,
        user_cover_path: 1,
        user_fname: 1,
        user_lname: 1,
        user_uname: 1,
        user_bdate: 1,
    }).exec().then(user_info => {
        res.render('user/request', {
            title: session.user_name + '\'s | Requests',
            user_info: user_info,
        });
    }).catch(err => {
        console.log(err)
    });
});

router.post('/get_request', checkAuth, function (req, res, next) {
    tbl_frnd_req.find({req_to: session.user_id, request_status: "requested"})
        .exec()
        .then(user_data => {
            console.log("user_data = " + user_data);
            if (user_data.length != 0) {
                user_data.forEach(get_details => {
                    tbl_user.find({_id: get_details.req_from})
                        .exec()
                        .then(req_users => {
                            console.log("req_users = " + req_users);
                            res.send({
                                req_users: req_users,
                            });
                        }).catch(err => {
                        console.log(err);
                    })
                })
            }
            else {
                res.send({
                    req_users: null
                });
            }

        }).catch(err => {
        console.log(err);
    });
});

router.post('/send_forgot_password_mail', function (req, respo, next) {
    $email = req.body.email;
    $name = "";
    session.otp = "";
    var randomstring = Math.random().toString(36).slice(-6);
    session.otp = randomstring;
    tbl_user.find({'user_email': $email},
        {
            'user_fname': 1,
            'user_lname': 1,
        }).exec().then(user_data => {
        user_data.forEach(data => {
            $name = data.user_fname + " " + data.user_lname;
        });
        try {
            mailer.sendMail({
                from: 'noreply@SocioTiuch.com',
                to: req.body.email,
                subject: "Password Recovery Mail",
                template: 'sendotp',
                context: {
                    name: $name,
                    otp: randomstring
                }
            }, function (err, res) {
                if (err) {
                    console.log("mail err = " + err);
                    respo.send("error")
                } else {
                    if (res['response'].substring(0, 3) == 250) {
                        respo.send("done");
                    }
                    else {
                        respo.send('failed');
                    }
                }
            });
        }
        catch {
            respo.send('nw_prb');
        }
    }).catch(err => {
        console.log("out err = " + err);
        respo.send('error');
    });
});

router.post('/checkotp', function (req, res, next) {
    var otp = req.body.otp;
    if (session.otp == otp) {
        res.send('done');
    }
    else {
        res.send('error');
    }
});

router.get('/manage_profile', checkAuth, function (req, res, next) {
    tbl_user.find({user_uname: session.user_name}, {
        user_img_path: 1,
        user_cover_path: 1,
        user_fname: 1,
        user_lname: 1,
        user_uname: 1,
        user_bdate: 1,
    }).exec().then(user_info => {
        res.render('user/user_info', {
            title: session.user_name + '\'s | Info',
            user_info: user_info,
        })
    }).catch(err => {
        console.log(err);
    });
});

router.post('/update_info', checkAuth, function (req, res, next) {

    console.log('in update info');
    tbl_us = new tbl_user_info();

    tbl_us.user_id = session.user_id;
    tbl_us.watch = req.body.txt_watch;
    tbl_us.food = req.body.txt_fav_food;
    tbl_us.place = req.body.txt_place;
    tbl_us.read = req.body.txt_read;

    tbl_us.save((err, doc) => {
        if (err) {
            console.log(err);
            res.send("Error sending = " + err);
        }
        else {
            res.send("success");
        }
    });
});

router.post('/update_password', function (req, res, next) {
    var email = req.body.email;
    let hash = bcryptjs.hashSync(req.body.updt_pass, 10);
    tbl_user.update({'user_email': email}, {'user_password': hash})
        .exec()
        .then(data => {
            res.send("done");
        })
        .catch(err => {
            res.send('err');
        });
});
module.exports = router;
