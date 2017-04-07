app.controller('Router', ['$scope', '$http', function ($scope, $http) {
  $scope.list = []
  $scope.check = false
  $scope.success = false
  $scope.with = false
  $scope.check_e = false
  $scope.success_e = false
  $scope.with_e = false
  $scope.add = function () {
  //  console.log($scope.data);

    if (isValid($scope.data['rt_name'])) {
      $scope.check = true
    } else {
      $scope.check = false
      $http.post('/setting/customer/router', $scope.data).then(value => {
        $scope.list.push(value.data[0])
        $scope.success = true
        $scope.with = false
        $scope.check = false
        console.log($scope.list)
      }, error => {
        $scope.success = false
        $scope.with = true
        console.log(error)
        alert(error)
      })
      $scope.data = null
    }
  }
  $scope.delete = (index)=>{

  $http.get('/setting/customer/router/delete/'+$scope.list[index].rt_id).then(value => {
    $scope.list.splice(index,1)
  }, error=>{
    alert('error server');
  })
  }
  $scope.edite = function (index) {
    $scope.temp = $scope.list[index]
    $scope.position = index
    editShow()
  }
  $scope.save = function () {
    if (isValid($scope.temp.rt_name)) {
      $scope.check_e = true
    } else {
      $scope.check_e = false
      let data = { rt_name: $scope.temp.rt_name, rt_st: $scope.temp.rt_st }
      console.log(data)
      $http.put('/setting/customer/router/' + $scope.temp.rt_id, data).then(value => {
        $scope.list[$scope.position] = value.data[0]
        $scope.with_e = false
        $scope.success_e = true
      }, error => {
        $scope.success_e = false
        $scope.with_e = true
        console.log(error)
      })
    }
  }
  $http.get('/setting/customer/router').then(value => {
    $scope.list = value.data
    console.log($scope.list)
  }, error => {
    console.log(error)
  })
}])

function editShow () {
  $('#edite_router').modal('show')
}
