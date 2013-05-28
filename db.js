// file name: db.js
// 官方文档: http://mongoosejs.com/docs/index.html

var mongoose = require('mongoose');

//数据类型 SchemaTypes
/*
String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
*/

//定义数据模型
var RssFeedSchema = mongoose.Schema({
  uri      : String,
  title        : String,
  desc         : String,
  create_time  : Date
});

//注册模型
mongoose.model('RssFeed', RssFeedSchema);

//连接数据库
mongoose.connect('mongodb://localhost/rssreader');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function callback () {
	console.log('database once open');
});