
/*
 * GET home page.
 */

var mongoose = require('mongoose');
var RssFeed  = mongoose.model('RssFeed');
var utils    = require('connect').utils;

exports.index = function(req, res){
  RssFeed.find({}).sort('-create_time').exec(function(err, rssFeeds, count) {
  	if(err) return next(err);

  	res.render('index', {
  		title : 'Rss Reader',
  		rssFeeds : rssFeeds
  	});
  });

};

exports.getAll = function(req, res, next) {
	RssFeed.find({}).sort('-create_time').exec(function(err, rssFeeds, count) {
  	if(err) return next(err);

  	console.log(rssFeeds);
  	res.send(rssFeeds);
  });
};

exports.create = function ( req, res, next ){
  //表单数据都存放在req.body中
  var feed = new RssFeed({
      uri         : req.body.rssFeedUri,
      create_time : Date.now()
  });
  feed.save( function ( err, feed ){
    if( err ) return next( err );
 	console.log(feed);
    res.redirect( '/' );
  });
};

exports.delete = function ( req, res, next ){
  RssFeed.findById( req.params.id, function ( err, feed ){
 
    feed.remove( function ( err, feed ){
      if( err ) return next( err );
      console.log(res);
      res.send('{"success": true}');
    });
  });
};