const jwt = require('jsonwebtoken');
var session = require('express-session'); // session package


module.exports = (req, res, next) => {
    if (session.jwt_token) {
        try {
            const decode = jwt.verify(session.jwt_token, process.env.Key);
            req.userData = decode;
            session.user_id = req.userData['userId'];
            session.user_name = req.userData['user_name'];
            next();
        } catch (e) {
            res.redirect('/');
            // res.status(401).json({
            //     err: e,
            //     msg: 'Auth Failed from check auth'
            // })
        }
    }
    else {
        res.redirect('/');
    }
};