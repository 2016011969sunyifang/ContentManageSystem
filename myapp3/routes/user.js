var express = require('express');
var router = express.Router();
const userf = require("../sql/admin");


/* GET home page. */
router.get("/", function (req, res, next) {
  // 先请求数据库数据，将数据渲染到页面模板

  userf.find({}, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.render("user", {
      index: 2,
      data: data
    })
  })
});


//添加数据
router.get('/add', function (req, res, next) {
  res.render('userAdd', {
    index: 2,
  });
});

router.post("/addAction", function (req, res, next) {


  let obj = req.body;
  // obj.price = Number(obj.price);
  // obj.discount = obj.discount - 0;
  console.log(obj);
  userf.insertMany(obj, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/user");
  })

});



// 删除操作
router.get("/delete", function (req, res, next) {
  console.log(req.query)
  userf.deleteOne({ '_id': req.query._id }, (err, data) => {
    if (err) {
      console.log(err);
    }
    //重定向跳转页面

    res.redirect("/user");
  })


});

//修改-查
router.get("/update", function (req, res, next) {
  //get来的数据在req.query.id
  console.log(req.query)
  const a_id = req.query._id;

  userf.findById({ "_id": a_id }, (err, data) => {
    if (err) {
      console.log(err)
    }

    res.render("userUpdate", {
      index: 2,
      data: data
    })
  })
});


// // 修改操作 - 更新数据
// router.post("/updateAction", function (req, res, next) {
//   const obj = req.body;
//   userf.findByIdAndUpdate(obj._id, obj, (err, data) => {
//     if (err) {
//       console.log(err)
//     }
//     res.redirect("/user");
//   })
// });

router.post("/updateAction", function (req, res, next) {
  console.log('我在/updateAction里面')
  // 接收当前商品的数据
  const obj = req.body;

  // 处理数据类型，符合数据集合的字段类型
  // obj.price = Number(obj.price);
  // obj.stock = parseFloat(obj.stock);
  // obj.discount = obj.discount - 0;
  // obj.sales = obj.sales - 0;
  // obj.score = obj.score * 1;
  console.log('obj_id', obj)
  userf.findByIdAndUpdate(obj._id, obj, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/user");

  })
});

//sort 排序
router.get("/sort1", (req, res, next) => {
  const obj = req.query;
  userf.find({}).sort({ adminId: 1 }).exec((err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.render("user", {
      index: 2,
      data,
    })
  })

});

router.get("/sort2", (req, res, next) => {
  const obj = req.query;
  userf.find({}).sort({ adminId: -1 }).exec((err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.render("user", {
      index: 2,
      data,
    })
  })
});

//商品搜索
router.get("/search", (req, res, next) => {
  console.log("商品搜索路由 搜索数据")
  const obj = req.query;

  let reg = new RegExp(obj.search);
  userf.find({ adminName: reg }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.render("user", {
      index: 2,
      data,
    });
  })


});
module.exports = router;





