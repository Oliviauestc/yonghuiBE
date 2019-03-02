 var mongoose = require('mongoose')
 var ClassSchema = require('../schemas/class') //拿到导出的数据集模块
 var Class = mongoose.model('Class', ClassSchema) // 编译生成Movie 模型

 module.exports = Class