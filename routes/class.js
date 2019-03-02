var Class = require('../models/class');// 引入模型
var Goods = require('../models/goods');// 引入模型
var express = require('express');
var router = express.Router();
router.get('/',function(req,res,next){
  console.log('class router')
  if (JSON.stringify(req.query) === '{}') {
    Class.
    find().
    sort({'id':1}).
    exec(function (err, response) {
      if (err) {
        console.log("Error:" + err);
      }
      else {
        res.json({data: response});
      }
    });
  } else {
    if (req.query.classId) {
      Goods.
      find({'classId':parseInt(req.query.classId)}).
      sort({'goodsId':1}).
      exec(function (err, response) {
        if (err) {
          console.log("Error:" + err);
        }
        else {
          res.json({data: response});
        }
      });
    } else if (req.query.type) {
      if (req.query.type === 'onsale') {
        Goods.
        find({'isOnSale':true}).
        sort({'goodsId':1}).
        exec(function (err, response) {
          if (err) {
            res.json({data: err});
          }
          else {
            res.json({data: response});
          }
        });
      }
    } 
  }
})

module.exports = router;
