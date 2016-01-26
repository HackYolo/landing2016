angular.module("register", [])
  .controller('login_controller', [
    "$scope",
    "$http",
    function(
      $scope,
      $http
    ) {
      $scope.ggform = {};

      $scope.login = function(){
        if(!$scope.ggform.name){
          return alertify.error("名字勒？")
        }
        $http.post('/login', $scope.ggform).success(function(res){
          location.href = '/';
        }).error(function(err){
          if(err.msg)alertify.error(err.msg)
          else alertify.error('壞掉惹')
        });
      }
    }]);