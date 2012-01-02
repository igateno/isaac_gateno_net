var mongo = require('mongodb');

Blog = function(host, port){
  var param = { auto_reconnect : true };
  this.db = new mongo.Db(
    'isaac_gateno_net', new mongo.Server(host, port, param, {}));
  this.db.open(function(){});
};

Blog.prototype.getCollection = function(callback) {
  this.db.collection('posts', function(error, post_collection) {
    if (error) {
      callback(error);
    } else {
      callback(null, post_collection);
    }
  });
};

Blog.prototype.findAll = function(callback) {
  this.getCollection(function(error, post_collection) {
    if (error) {
      callback(error);
    } else {
      post_collection.find().toArray(function(error, results) {
        if (error) {
          callback(error);
        } else {
          callback(null, results);
        }
      });
    }
  });
};

Blog.prototype.findById = function(id, callback) {
  this.getCollection(function(error, post_collection) {
    if (error) {
      callback(error);
    } else {
      var data = {};
      data._id =
        post_collection.db.bson_serializer.ObjectID.createFromHexString(id);
      post_collection.findOne(data, function(error, result) {
        if (error) {
          callback(error);
        } else {
          callback(null, result);
        }
      });
    }
  });
};

Blog.prototype.save = function(posts, callback) {
  this.getCollection(function(error, post_collection) {
    if (error) {
      callback(error);
    } else {
      if (typeof(posts.length) == "undefined") {
        posts = [posts];

        for (var ii = 0; ii < posts.length; ii++) {
          post = posts[ii];
          post.updated = new Date();

          if (post.comments === undefined) {
            post.comments = [];
          }
          for (var jj = 0; jj < post.comments.length; jj++) {
            post.comments[jj].updated = new Date();
          }
        }

        post_collection.insert(posts, function() {
          callback(null, posts);
        });
      }
    }
  });
};

exports.Blog = Blog;
