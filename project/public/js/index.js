var app = angular.module('main',[])
app.controller('mainController', ['$scope','$http', function($scope, $http){
  $http.get('/getuse').then(value=>{

    $scope.use = value.data
  },error=>{
    alert('error server');
  } )
  $http.get('/getall').then(value=>{
    $scope.all = value.data;
  }, error=>{
    alert('error server');
  })
  $http.get('/getlist').then(value=>{
    $scope.list = value.data;
  }, error=>{
    alert('error server');
  })
}])
