var Cart = require('../models/cart');// 引入模型
var Goods = require('../models/goods');// 引入模型
var express = require('express');
var router = express.Router();
router.post('/',function(req, res, next){
  var data = req.body;
  if (data.type === 'add') { // 加入购物车
    // console.log('加入购物车', parseInt(data.goodsId));
    Cart.
    find({ 'goodsId': parseInt(data.goodsId), 'userId': data.userId, 'status': 'cart' }).
    exec(function (err, response) {
      if (err) {
        // console.log("Error:" + err);
        res.send(err)
      }
      else {
        if (response.length) { //购物车已有该货物，只是增加数量
          console.log('购物车已有该货物', response);
          Cart.update({'goodsId': parseInt(req.body.goodsId),'userId': req.body.userId, 'status': 'cart'},
          {$inc:{quantity:1}},
          function(err, raw){
            if(err) {
              res.send(err)
            } else {
              Cart.
              find({'userId': req.body.userId, 'status': 'cart'}).
              exec(function (err, response) {
                if (err) {
                  res.send(err)
                }
                else {
                  // res.writeHead(200, {
                  //   'Content-Type': 'text/plain' 
                  // })
                  res.end(JSON.stringify(response))
                }
              });
            } 
          })
        } else { //购物车无该货物，首次加入
          // console.log('购物车无该货物,查找');
          Goods.
          find({ 'goodsId': parseInt(data.goodsId)}).
          exec(function (err, response) {
            // console.log('购物车无该货物,加入', response[0]);
            let cartItem = new Cart({
              userId: data.userId,
              goodsId: response[0].goodsId,
              goodsName: response[0].goodsName,
              imgUrl: response[0].imgUrl,
              price: response[0].price,
              quantity: 1,
              status: 'cart',
              orderId: ''
            });
            cartItem.save((err, cartItem)=>{
              if(err) {
                res.send(err);
              } else {
                console.log('cartItem', cartItem)
                Cart.
                find({'userId': req.body.userId, 'status': 'cart'}).
                exec(function (err, response) {
                  if (err) {
                    res.send(err)
                  }
                  else {
                    res.writeHead(200, {'Content-Type': 'text/plain'})
                    res.end(JSON.stringify(response))
                  }
                });
              } 
            });
          })
        }
      }
    });
  } else if (data.type == 'minus') { // 减少数量
    Cart.
    find({'goodsId': parseInt(req.body.goodsId),'userId': req.body.userId, 'status': 'cart'}).
    exec(function (err, response) {
      if (err) {
        res.send(err)
      }
      else {
        if (response[0].quantity === 1) { // 减少数量
          Cart.deleteOne({'goodsId': parseInt(req.body.goodsId),'userId': req.body.userId, 'status': 'cart'},function(err,raw){
            // console.log('删除产品结果',raw);
            Cart.
            find({'userId': req.body.userId, 'status': 'cart'}).
            exec(function (err, response) {
              if (err) {
                res.send(err)
              }
              else {
                res.json({data: response})
              }
            });
          })
        } else {
          Cart.update({'goodsId': parseInt(req.body.goodsId),'userId': req.body.userId, 'status': 'cart'},{$inc:{quantity:-1}},function(err,raw){
            // console.log('减少数量结果',raw);
            Cart.
            find({'userId': req.body.userId, 'status': 'cart'}).
            exec(function (err, response) {
              if (err) {
                res.send(err)
              }
              else {
                res.json({data: response})
              }
            });
          })
        }
      }
    });
  }
})
router.get('/', function(req, res, next){
  Cart.
  find({'userId': req.query.userId, 'status': 'cart'}).
  exec(function (err, response) {
    if (err) {
      console.log("Error:" + err);
    }
    else {
      res.json({data: response})
    }
  });
})

module.exports = router;
