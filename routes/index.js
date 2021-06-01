// requiring module start//

require("dotenv").config();
var express = require('express');
var router = express.Router();

var csrf = require('csurf'); // importing csrf for security of csross site scripting
var session = require('express-session'); // session package
//var upload = require('express-fileupload'); // image upload package
var nodemailer = require('nodemailer'); // mail package
var hbs = require('nodemailer-express-handlebars'); // mail package to render html
var multer = require('multer'); // to upload files
var path = require('path'); // tp direct the path to save files
var fs = require('fs'); // managing file system
var bcryptjs = require('bcryptjs');// to encrypt the text
var csrfProtection = csrf(); // cross site scripting package (for security)
// router.use(csrfProtection); // handling all routes using csrf protection

var jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check_auth');


// requiring module ends//

// ------------------------------------------------------------- //

// sending mail in node js start//

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

// sending mail in node js ends //

// ------------------------------------------------------------- //

// model used in index routing for gethering data start//

var tbl_state = require('../models/tbl_state');
var tbl_city_data = require('../models/tbl_city_data');
var tbl_user = require('../models/tbl_user_data');
var tbl_gender = require('../models/tbl_gender');

// model used in index routing for gethering data ends//

// ------------------------------------------------------------- //
const storage = multer.diskStorage({
    destination: './public/images/user_images/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// init upload

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    }, fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
}).single('file');

// check file function

function checkFileType(file, cb) {
    // list of allowed extension
    const filetypes = /jpeg|jpg|gif|png/;

    // check extention
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    // check mime tyoe 
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        // fs.unlink
        cb("Error : Images Only!!!");
    }
}


// ------------------------------------------------------------- //


/* Routing starts */

// route for getting home page (login/reg)
router.get('/', function (req, res, next) {
    console.log("home route called");
    tbl_state.find().exec().then(doc => {
        tbl_gender.find().exec().then(genders => {
            res.render('user/login', {
                title: "SocioTouch | Login",
                tbl_state1: doc,
                genders: genders,
            });
        }).catch(err => {
            console.log("error_1" + err);
        });
    }).catch(err => {
        console.log("errors" + err);
    });
});

// route for checking email in the database 
router.post('/check_mail/user', function (req, res, next) {
    console.log("check mail cakked");
    tbl_user.find({user_email: req.body.email}).exec().then(email_check => {
        if (email_check.length != 0) {
            res.status(200).send({
                email_check: "exist",
            })
        } else {
            res.status(200).send({
                email_check: "allow",
            })
        }
    });
});

// route for getting sendign state city as ajax's response (login/reg)
router.post('/get_citys', function (req, res, next) {
    console.log("get cities called");

    var state_id = req.body.state_id;
    tbl_city_data.find({'state_id': state_id}).exec().then(doc => {
        res.status(200).send({doc: doc});
    }).catch(err => {
        console.log(err);
    });
});

//route that checks the username already exist or not

router.post('/checkusername', function (req, res, next) {
    console.log("username route called");
    var user_name = req.body.check_user_name;
    tbl_user.find({'user_uname': user_name}).exec().then(doc => {
        if (doc.length != 0) {
            res.status(200).send({
                doc: "exist",

            })
        }
        else {
            res.status(200).send({
                doc: "allow",

            })
        }
    }).catch(err => {
        console.log(err);
    });
});

// route to get the user_image while entering user name for login

router.post('/get_profile', function (req, res, next) {
    console.log("in get image");
    var uname = req.body.id;
    tbl_user.find({'user_uname': uname}, {'user_img_path': 1}).exec().then(img_path => {
        if (img_path.length != 0) {
            res.status(200).send({img_path: img_path});
        }
        else {
            res.status(200).send({img_path: "no_user"});
        }
    }).catch(err => {
        console.log(err);
    });
});

// route for registring user

router.post('/reg_send_otp', function (req, respo, next) {


    session.reg_otp = "";
    var randomstring = Math.random().toString(36).slice(-6);
    session.reg_otp = randomstring;

    try {

        mailer.sendMail({
            from: 'noreply@SocioTiuch.com',
            to: req.body.email,
            subject: "Password Recovery Mail",
            template: 'reg_otp_mail',
            context: {
                name: req.body.name,
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
});

router.post('/reg_checkotp', function (req, res, next) {
    var otp = req.body.otp;
    if (session.reg_otp == otp) {
        res.send('done');
    }
    else {
        res.send('error');
    }
});

router.post('/register', function (req, res, next) {

    console.log("/ post");

    upload(req, res, (err) => {
        if (err) {
            console.log("this error = " + err);
            res.send('upload_error');
        }
        else if (req.body.txt_fname == "" ||
            req.body.txt_lname == "" || req.body.txt_uname == "" ||
            req.body.datepicker == "" || req.body.drp_dwn_gen == "" ||
            req.body.txt_cont_no == "" || req.body.txt_email == "" ||
            req.body.drp_dwn_state == "" || req.body.drp_dwn_citys == "" ||
            req.body.txt_pass == "" || req.body.txt_confi_pass == "") {
            // console.log("Hello blank fields = " + req.body);
            res.send('all_field-4');
        }
        else {
            if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,})/.test(req.body.txt_confi_pass)) {
                if (req.body.txt_pass == req.body.txt_confi_pass) {
                    var cover_path = '/images/user_cover/user_cover.jpg';
                    if (req.file == undefined) {
                        var file_path = '/images/default_user/ava.jpg';
                    } else {
                        $pth = req.file.filename;
                        var file_path = '/images/user_images/' + $pth;
                    }


                    tbl_user_data = new tbl_user();

                    let hash = bcryptjs.hashSync(req.body.txt_confi_pass, 10);
                    tbl_user_data.user_img_path = file_path;
                    tbl_user_data.user_cover_path = cover_path;
                    tbl_user_data.user_fname = req.body.txt_fname;
                    tbl_user_data.user_lname = req.body.txt_lname;
                    tbl_user_data.user_uname = req.body.txt_uname;
                    tbl_user_data.user_bdate = req.body.datepicker;
                    tbl_user_data.user_gender = req.body.drp_dwn_gen;
                    tbl_user_data.user_contact = req.body.txt_cont_no;
                    tbl_user_data.user_email = req.body.txt_email;
                    tbl_user_data.user_state = req.body.drp_dwn_state;
                    tbl_user_data.user_city = req.body.drp_dwn_citys;
                    tbl_user_data.user_password = hash;
                    tbl_user_data.save((err, doc) => {
                        if (err) {
                            if (req.file) {
                                fs.unlink('./public/images/user_images/' + $pth, function (err) {
                                    // console.log("file unlinking error" + err);
                                });
                            }
                            res.send('all_field-1')
                        }
                        if (!err) {
                            res.send('done');
                        }
                    });
                } else {
                    fs.unlink('./public/images/user_images/' + $pth, function (err) {
                        // console.log("file unlinking error" + err);
                    });
                    res.send('all_field-2');
                }
            }
            else {
                res.render('all_field-3');
            }
        }
    });

});

//route for logging in user
router.post('/login', (req, res, next) => {
    console.log("postlogin");
    tbl_user.find({user_uname: req.body.id})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    msg: "Auth Failed 00"
                });
            }
            bcryptjs.compare(req.body.pass, user[0].user_password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        msg: "Auth Failed 11"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            user_name: user[0].user_uname,
                            email: user[0].user_email,
                            userId: user[0]._id
                        }, process.env.Key,
                        {
                            expiresIn: "1h"
                        }
                    );
                    session.jwt_token = token;
                    return res.json({
                        msg: "Auth Successful",
                        token: token
                    });
                }
                res.status(200).json({
                    msg: "Auth Failed"
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                msg: err
            })
        })
});
router.get('/logout', function (req, res, next) {
    session.jwt_token = "";
    res.redirect('/');
});

/* Routing starts */

// ------------------------------------------------------------- //

module.exports = router; // router module created and exported
