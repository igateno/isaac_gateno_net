module.exports = function(app) {
  // Landing page
  app.get('/', function(req, res) {
    res.render('index', {
      layout: 'layouts/default',
    });
  });

  // ------------------------------ start blog ---------------------------------

  var blog = new Blog('localhost', 27017);

  // All posts
  app.get('/blog', function(req, res) {
    blog.findAll(function(error, posts) {
      res.render('blog.jade', {
        layout : 'layouts/main',
        locals : {
          title : 'Blog',
          posts : posts,
          page : 'blog'
        }
      });
    });
  });

  // ------------------------------ end blog -----------------------------------

  // ------------------------------ start photos --------------------------------

  app.get('/photos', function(req, res) {
    res.render('photos.jade', {
      layout : 'layouts/main',
      locals : {
        page : 'photos'
      }
    });
  });

  // ------------------------------ end photos ----------------------------------

  // ------------------------------ start resume --------------------------------

  app.get('/resume', function(req, res) {
    res.render('resume.jade', {
      layout : 'layouts/main',
      locals : {
        page : 'resume'
      }
    });
  });

  // ------------------------------ end resume ----------------------------------

  // ------------------------------ start about --------------------------------

  app.get('/about', function(req, res) {
    res.render('about.jade', {
      layout : 'layouts/main',
      locals : {
        page : 'about'
      }
    });
  });

  // ------------------------------ end about ----------------------------------
}
