var User = require('../models/user');// 引入模型
var express = require('express');
var https = require('https');
var router = express.Router();
const appId = 'wx705b85bced464a5a';
const secretId = '292c0bbf7825bbaf3ff4593752e3b933';
/* GET home page. */
router.get('/', function(req, res, next) {
  var url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secretId}&js_code=${req.query.code}&grant_type=authorization_code`;
  https.get(url, function(response) {
    var json = '';
    response.on('data', function (d) {
      json += d;
    });
    response.on('end',function(){
      json = JSON.parse(json);
      let user = new User({
        userId: json.openid
      });
      user.save((err, user)=>{
        if(err) {
          console.log(err);
          return
        } else {
          console.log(user);
        } 
      });
      res.json({ data: json });
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
});

module.exports = router;
