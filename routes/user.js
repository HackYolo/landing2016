//var express = require('express');
//var router = express.Router();

//[> GET users listing. <]
//router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
//});

//module.exports = router;


var crypto = require('crypto');

exports.register = function(req, res){
  var name = req.body.name;
  var password = req.body.password;
  var passwd2 = req.body.password2;
  if(!name){
    return res.status(403).json({msg:"名字勒?"})
  }
  if(password !== passwd2){
    return res.status(403).json({msg:"重複密碼還會打錯，你是白痴嗎？"})
  }
  var sha1 = crypto.createHash('sha1');
  password = sha1.update(password).digest('hex');

  DB.collection("users")
    .findOne({
      name: name
    }, function(err, doc){
      if(doc){
        return res.status(403)
          .json({msg: "名字用過了，換個吧唉～"})
      }
      DB.collection("users")
        .insert({
        name: name,
        password: password
      }, function(err){
        if(err){
          console.log(err)
          return res.status(500).json({msg: "壞掉惹"})
        }
        return res.json({msg:"success"})
      })
    })
}

exports.login = function(req, res){
  var name = req.body.name;
  var password = req.body.password;

  var sha1 = crypto.createHash('sha1');
  password = sha1.update(password).digest('hex');

  DB.collection("users")
    .findOne({
      name: name,
      password: password
    }, function(err, doc){
      if(!doc){
        return res.status(403)
          .json({msg:"反正你就是打錯了呵呵"})
      }
      req.session.user = doc;
      return res.json({msg: "成功"})
    })
}

exports.logout = function(req, res){
  delete req.session.user;
  res.redirect('/');
}

