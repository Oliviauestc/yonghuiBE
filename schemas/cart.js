var mongoose = require('mongoose');

//申明一个mongoose对象
var CartSchema = new mongoose.Schema({
    userId: String,
    goodsId: Number,
    goodsName: String,
    imgUrl: String,
    price: Number,
    quantity: Number,
    status: String,
    orderId: String
})
//暴露出去的方法
module.exports = CartSchema