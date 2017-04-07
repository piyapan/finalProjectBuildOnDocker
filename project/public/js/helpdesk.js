var app = angular.module('help', [])
app.controller('helpController', ['$scope','$http', function ($scope, $http) {

    $scope.getIp = function(id){
      $http.get('/helpdesk/getList/'+id).then(value => {
        $scope.list = value.data;
      }, error=>{
        console.log(value.error);
      })
      $http.get('/helpdesk/groupIp/'+id).then(value => {
        $scope.content = value.data[0];
      }, error=>{
        console.log(value.error);
      })
    }
    $scope.selectItem = function(index){
      $scope.packages = {
        detail:$scope.content,
        data:$scope.list[index]
      }
      changIP();
    }
    $scope.check = function(){

    }
    $scope.save = function(){

      $http.post('/helpdesk/compear',$scope.packages.data).then(value => {
        console.log(value.data[0]['number']);
          if (value.data[0]['number'] >1) {

            $scope.alert_ais = true
            $scope.alert_dtac = true

          } else {
            $scope.alert_ais = false
            $scope.alert_dtac = false
            console.log($scope.packages.data);
            $http.post('/helpdesk/edite',$scope.packages.data).then(value => {
              close()
            },error=>{
              alert('server error update');
            })
            close();
          }
      },error=>{
        alert('server compear error');
      })
    }
}])
function close(){
  $("#use").modal('hide')
}
