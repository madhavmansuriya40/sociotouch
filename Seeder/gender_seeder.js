var Gender = require('../models/tbl_gender');
var mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.DB_STRING, {useNewUrlParser: true});

var gender = [
    new Gender({
        gen_id : 1,
        name :"Male"
    }),
    new Gender({
        gen_id : 2,
        name :"Female"
    }),
    new Gender({
        gen_id : 3,
        name :"Others"
    }),
    
];

var count = 0;
for (var i = 0; i < gender.length; i++) {
    gender[i].save(function (err, res) {
        console.log(err);
        count++;
        if(count == gender.length)
        {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
};