app.controller('StateController', ['$scope', '$http', function ($scope, $http) {
  $scope.test = 'test'
  $scope.temp = []
  $http.get('/setting/customer/status').then(value => {
    $scope.temp = value.data
  }, error => {
    console.log(error)
    alert('error sever')
  })
  $scope.check_e = false
  $scope.success_e = false
  $scope.with_e = false
  $scope.edite = (index) => {
    showState()
    var st = {name: $scope.temp[index]['cs_name'], color: $scope.temp[index]['cs_color'], cs_id: $scope.temp[index]['cs_id']}
    $scope.select = st
      // document.getElementById('color_e').value = $scope.temp[index]['cs_color'];
    $scope.update = () => {
      if (isValid($scope.select['name'])) {
        $scope.check_e = true
      } else {
        $scope.check_e = false
        var tempColor_e = document.getElementById('color_e')
        var color_e = tempColor_e.value
        var data_e = {cs_name: $scope.select['name'], cs_color: color_e, cs_id: $scope.temp[index]['cs_id']}
        $http.post('/setting/customer/status/edite', data_e).then(value => {
          hideStatus()
          $scope.temp[index] = data_e
          $scope.success_e = true
          $scope.with_e = false
          $scope.select = null
        }, error => {
          $scope.success_e = false
          $scope.with_e = true
        })
      }
    }
  }
  $scope.delete = (index) => {
    let id = $scope.temp[index]['cs_id']
    $http.get('/setting/customer/status/delete/' + id).then(value => {
      $scope.temp.splice(index, 1)
    }, error => {
      alert('server error')
    })
  }
  $scope.check = false
  $scope.success = false
  $scope.with = false
  $scope.add = function (value) {
    if (isValid(value.name)) {
      $scope.check = true
    } else {
      var tempColor = document.getElementById('color')
      var color = tempColor.value

      var data = {cs_name: value.name, cs_color: color}
      $http.post('/setting/customer/status', data).then(value => {
        $scope.temp.push(data)
        tempColor.value = null
        var tempName = document.getElementById('nameState')
        tempName.value = null
        $scope.success = true
        $scope.with = false
        value = null
        $scope.data = null
      }, error => {
        console.log(error)
        $scope.success = false
        $scope.with = true
        $scope.value = null
      })
    }
  }
}])
function hideStatus () {
  $('#stateEdite').modal('hide')
}
function showState () {
  $('#stateEdite').modal('show')
}
