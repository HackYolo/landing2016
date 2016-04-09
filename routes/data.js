
var config = require('../config');
var User = require('../models/user.js');
var mongojs = require('mongojs');

var canAccessAdmin = function( req, res, next ){
  if( req.user.fb.id == config.fb_rootAdmin || req.user.isAdmin )
    return next();
  res.send(403, 'NONONO you are not allowed to play here');
};

module.exports = function( app ){

  app.all( '/admin/*', canAccessAdmin );
  
  app.get('/admin/userlist', function(req, res){
    User.find( function(err, docs){
      if( err ){
        console.log(err);
        res.send( 404, 'Find users error' );
      } else {
        res.json( docs );
      }
    });
  });

  app.delete('/admin/userlist/:id', function(req, res){
    User.find( {"_id": mongojs.ObjectId( req.params.id ) } ).remove(function(err, doc){
      if( err ){
        console.log(err);
        res.send( 404, 'Delete user error' );
      } else {
        res.json( doc );
      }
    });
  });

  app.put('/admin/makeadmin/:id', function(req, res){

    var id = req.params.id;
    User.findOne(
      { "_id": mongojs.ObjectId( id ) },
      function(err, user){
        if(err)
          console.log(err, "**********************************");
        else{
          user.isAdmin = !user.isAdmin;

          user.save(function(err, doc){
            if(err){
              res.send(500, 'user.save error');
            }else{
              res.json( doc );
            }
          });
        }
      }
    );

  });

}
