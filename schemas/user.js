var mongoose = require('mongoose');

//申明一个mongoose对象
var UserSchema = new mongoose.Schema({
    userId: String
})
//暴露出去的方法
module.exports = UserSchema