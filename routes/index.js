var user_route = require('./user');

module.exports = function(app){
  //web page 
  app.get('/', function(req, res){
    res.render('index',{
      title: "GG mama",
      user: req.session.user
    })
  });
  app.get('/register', function(req, res){
    res.render('register',{
      user: req.session.user
    })
  });
  app.get('/login', function(req, res){
    res.render('login', {
      user: req.session.user
    })
  });

  // post method
  app.post('/register',user_route.register);
  app.post('/login',user_route.login);
  app.get('/logout', user_route.logout);
}

