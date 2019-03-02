var mongoose = require('mongoose');

//申明一个mongoose对象
var OrderSchema = new mongoose.Schema({
    userId: String,
    orderId: String
})
//暴露出去的方法
module.exports = OrderSchema