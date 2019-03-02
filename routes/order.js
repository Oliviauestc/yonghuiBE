var uuid = require('node-uuid');
var Cart = require('../models/cart');// 引入模型
var Order = require('../models/order');// 引入模型
var express = require('express');
var router = express.Router();
router.post('/',function(req, res, next){
  var orderId = uuid.v1();
  var selectedIds = transStrToArr(req.body.selectedIds)
  Cart.
  updateMany({"goodsId":{"$in":selectedIds}}, {$set: {"status": "unpay", "orderId": orderId}}).
  exec(function (err, response) {
    if (err) {
      console.log("Error:" + err);
    }
    else {
      var orderItem = new Order({
        userId: req.body.userId,
        orderId: orderId
      });
      orderItem.save((err, orderItem)=>{
        if(err) {
          res.send(err);
        } else {
          res.json({data:orderId});
        }
      });
    }
  });
})
router.get('/',function(req, res, next){
  Cart.
  find({"userId":req.query.userId,"orderId": req.query.orderId,"status": "unpay"}).
  exec(function (err, response) {
    if (err) {
      res.send(err);
    }
    else {
      console.log("response", response)
      res.json({data:response})
    }
  });
})
function transStrToArr (str) {
  var sub = str.substring(1, str.length - 1);
  var arr = sub.split(',');
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    newArr.push(parseInt(arr[i]));
  }
  return newArr;
}
module.exports = router;
