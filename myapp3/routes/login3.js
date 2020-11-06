var express = require("express");
var router = express.Router();
const user = require("../sql/admin");


router.get("/", function (req, res, next) {
    res.render("login");
});


router.post("/in", function (req, res, next) {

    let obj = req.body;
    user.findOne(obj, (err, data) => {
        if (err) {
            console.log(err);
        }
        if (data) {
            // res.cookie('islogin', 'ok')
            req.session.islogin = 'ok'
            res.redirect('/pro');
        } else {
            res.redirect('/register3')
        }


    });
});


module.exports = router;