var mongoose = require('mongoose');

//申明一个mongoose对象
var ClassSchema = new mongoose.Schema({
    id: Number,
    value: String
})
//暴露出去的方法
module.exports = ClassSchema