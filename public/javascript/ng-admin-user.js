  var app = angular.module('admin-user', ['ngRoute']);

  app.controller('adminUsersCtrl', [
    "$scope","$window","$log","$http",
    function($scope, $window, $log, $http){
    var refresh = function(){
      $http.get('/admin/userlist').success(function(res){
        $scope.userlist = res;
      });
    };
    

    refresh();

    $scope.remove = function( user ){
      var ans = $window.confirm( "Are you sure to remove the user?" );
      if(ans){
        $http.delete('/admin/userlist/' + user._id).success(function(res){
          refresh();
        });  
      }
      else{
        console.log('Cancel to remove the user.');
      }
    };


    $scope.mkAdmin = function( user ){
      var ans = $window.prompt('What is his/her name?');
      if( ans == user.fb.displayName ){ // the answer is only want to check if the user knows how this works!
        $window.alert('You got the answer!');

        $http.put('/admin/makeadmin/' + user._id).then(
          function(res){
            refresh();
          },
          function(err){
            refresh();
            console.log(err);
          }
        );
      }else{
        $window.alert('Wrong answer... Please ask root admin');
      }
    };
  }]);
