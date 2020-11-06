var express = require("express");
//建立一个路由空表！！！！
var router = express.Router();
//引入user 模型 类似于英雄联盟  只能有六神装的设计
const user = require("../sql/admin");


router.get("/", function (req, res, next) {
    // console.log('此时进入了register3')
    res.render("register");
});



router.post("/in", function (req, res, next) {
    // console.log("进入register 的in 处理");

    let obj = req.body;

    // user.insertMany(obj, (err, data) => {
    //     if (err) {
    //         console.log(err)
    //     }
    //     console.log(data)

    //     if (data) {
    //         res.redirect('/login3')
    //     } else {
    //         res.redirect('/register3')
    //     }

    // })

    // console.log(obj)
    // console.log(obj.adminName);
    // console.log(obj.password)
    user.findOne({ adminName: obj.adminName }, (err, data) => {
        if (err) {
            console.log(err);
        } if (data) {
            console.log(obj.adminName);

            res.redirect('/register3')
        } else {
            user.insertMany(obj, (err, data) => {
                if (err) {
                    console.log(err)
                }
                if (data) {
                    res.redirect('/login3')
                } else {
                    res.redirect('/register3')
                }

            })
        }
    })


});



module.exports = router;