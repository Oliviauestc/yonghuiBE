var mongoose = require('mongoose');

//申明一个mongoose对象
var GoodsSchema = new mongoose.Schema({
    goodsId: Number,
    goodsName: String,
    imgUrl: String,
    price: Number,
    isOnSale: Boolean
})
//暴露出去的方法
module.exports = GoodsSchema