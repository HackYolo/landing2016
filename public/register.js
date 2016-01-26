angular.module("register", [])
  .controller('register_controller', [
    "$scope",
    "$http",
    function(
      $scope,
      $http
    ) {
      $scope.ggform = {};

      $scope.register = function(){
        if(!$scope.ggform.name){
          return alertify.error("名字勒？")
        }
        if($scope.ggform.password !== $scope.ggform.password2){
          return alertify.error("重複密碼還會打錯，你是白痴嗎？")
        }
        $http.post('/register', $scope.ggform).success(function(res){
          alertify.success('成功惹呵呵')
        }).error(function(err){
          if(err.msg)alertify.error(err.msg)
            else alertify.error('好像壞掉惹呵呵')
        })
      }
    }
  ]);

